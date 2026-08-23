---
title: "When a form becomes infrastructure: maintaining an official railway concession system"
description: "Building the MPSTME Railway Concession system was only the beginning. The harder part was making it official, keeping it dependable, and staying responsible for the people and process around it."
date: 2026-08-23
tag: "Backend"
cover: "/blog/concession-pass.jpg"
---

The first version of the MPSTME Railway Concession system looked like a form. Students entered their details, selected a date and time, and got a confirmation. It would have been easy to call the job finished there.

It was not finished. It was becoming official.

The system was built by [NeuroTechh](https://neurotechh.mpst.me), a team I am part of, and is used by MPSTME students for the railway concession process. I am now maintaining it and continuing to add features. That changed the nature of the work completely. A personal project can fail privately. An official college system fails in front of students, administrators, and a process that still has to happen that day.

The current system is documented on the [Railway Concession project page](/projects/railway-concession/).

This is the story of the work beyond the first deploy: getting a system accepted, translating administrative rules into software, supporting the people operating it, and learning that being responsible for software also means being responsible for its surroundings.

<figure>
  <img src="/blog/concession-form.jpg" alt="The MPSTME Railway Concession student submission form" />
  <figcaption>The public side is deliberately simple: collect the information, validate it, and give the student a clear next step.</figcaption>
</figure>

## Making it official is a different kind of engineering

There is a big difference between building something that works and building something an institution is willing to depend on.

For an unofficial tool, the conversation usually ends at: does the demo work? For an official tool, the questions continue:

- Who is allowed to submit?
- Which information is required, and which values are valid?
- When are students allowed to collect their forms?
- What happens when a student submits twice?
- How does an administrator find one student's record quickly?
- What happens when a collection date changes?
- Who gets notified when something goes wrong?
- Who will answer when somebody says, "I submitted it, but what do I do now?"

Those are not all software questions. They belong partly to the administration department, partly to the students using the system, and partly to the person maintaining it.

That is the part that is easy to miss when you are trying to get a project shipped. Making it official means earning enough confidence that the system can become part of an existing process. The interface has to be understandable. The rules have to be predictable. The data has to be treated carefully. And when the rules change, there has to be a person who notices, implements, and communicates the change.

The code is only one part of the promise.

## The real work happens in a loop

Once a system is in use, development stops being a straight line from requirements to release. It becomes a loop:

1. Stay in contact with the administration team and understand what changed.
2. Separate a policy change from a UI request.
3. Decide what must be enforced by the server rather than merely displayed by the client.
4. Implement the change without breaking existing submissions.
5. Test the student flow and the admin flow separately.
6. Deploy it, explain what changed, and remain available for support.

That last step matters more than it sounds. A feature is not complete just because the pull request is merged. It is complete when the person operating it understands it, the student can use it, and the next unexpected case has somewhere to go.

I had to stay in the loop with the administration department because the software was modelling a real process, not inventing one. Booking windows, holidays, collection dates, blocked records, and out-of-schedule collections all came from operational needs. My job was to make those needs clear and enforceable without turning every small change into a code change and redeploy.

## Turning administrative rules into one source of truth

The booking flow is a good example of where a simple form becomes a backend problem.

The collection date cannot just be accepted because a browser date picker allowed it. The server has to decide whether it is valid. It needs to account for lead time, weekends, holidays, the configured end date, and the rolling set of dates currently open for booking. It also needs to use Indian Standard Time, regardless of the timezone of the server running the app.

The solution was to move the rules into one shared module. The client asks the server for the current window so the interface can guide the student, but the submission endpoint validates the date again before writing anything:

```js
const bookingSettings = await getBookingSettings();
const result = validateBookingDate(
  formData.collectiondate,
  bookingSettings,
);

if (!result.valid) {
  errors.collectiondate = result.reason;
}
```

The settings are editable by an administrator: lead time, window size, blocked weekdays, holidays, and the final collection date. The window slides forward automatically, so the system does not need a deployment every morning just to open a new date.

The important design decision was not the date picker. It was deciding that policy belongs in a server-authoritative rule, with the client acting as a helpful mirror of that rule rather than the source of truth.

<figure>
  <img src="/blog/concession-settings.jpg" alt="Railway Concession system settings showing booking rules and blocked SAP IDs" />
  <figcaption>The settings panel lets the process change without a code change: booking rules, and the exceptional records administrators need to block.</figcaption>
</figure>

## Owning the data layer

One of the first substantial changes I made while taking responsibility for the system was moving its data layer to PostgreSQL with Drizzle ORM.

That was not a cosmetic rewrite. The database contains student submissions, collection dates, contact information, and the state of a physical handover. I wanted the schema and its indexes to be explicit, inspectable, and under our control:

```sql
CREATE INDEX IF NOT EXISTS idx_form_submissions_sapid
  ON form_submissions (sapid);

CREATE INDEX IF NOT EXISTS idx_form_submissions_slot
  ON form_submissions (collectiondate, timeslot);
```

The current submission is easy to query, but it is not the whole story. A student can submit again later, and an administrator may need to understand what changed. The system therefore keeps one current row for the student and an append-only history of inserts and updates alongside it.

That distinction is useful operationally. The current row answers, "What should we act on now?" The history answers, "How did we get here?" Both questions matter when somebody is standing in front of an administrator asking for help.

I also added indexes for the queries the system actually performs: SAP ID searches, collection-date searches, and date-plus-slot filtering. They are small details, but they are the kind of details that become visible when an admin is trying to find a record during a busy collection window.

## The admin interface is part of the product

The student-facing form is the most visible page, but the admin interface is where the process is actually operated.

An administrator can search submissions by date and time slot, export the results to Excel, or search directly by SAP ID. The SAP ID view brings together the student's personal details, academic and pass information, collection status, submission timeline, and history.

The collection checkbox is also more meaningful than a boolean on a screen. It records when a slip was collected, supports marking a student collected even when they arrive outside the expected schedule, and feeds the daily report. A report can distinguish students scheduled for that date, students who actually collected that day, and collections that happened outside the schedule.

<figure>
  <img src="/blog/concession-admin.jpg" alt="Admin dashboard showing synthetic railway concession submissions filtered by date" />
  <figcaption>The dashboard is built for the person handling the queue: filter by date and slot, see the important fields at a glance, and export when the spreadsheet is still needed.</figcaption>
</figure>

<figure>
  <img src="/blog/concession-profile.jpg" alt="Admin student profile showing submission details and collection status" />
  <figcaption>A SAP ID search gives administrators one place to answer the student's question instead of making them search across multiple screens.</figcaption>
</figure>

The interface also has to fail in a way that makes sense. Admin requests include bearer-token validation, expired-session handling, logout, masked response helpers, and optimistic collection updates that revert if the server rejects the change. None of these features make for an impressive demo on their own. Together, they make the dashboard usable when it is being used as a work tool instead of a showcase.

## Notifications are part of correctness

The system now sends a confirmation email after a successful submission. The important ordering is that the database write happens first. If the mail server is temporarily unavailable, a student should not receive an internal error that suggests their submission failed when the record was already saved.

The confirmation is intentionally a useful record rather than a generic "success" message. It repeats the SAP ID, collection date, time slot, deposit fee, validity note, and the instruction that the form will be given only during the selected slot.

<figure>
  <img src="/blog/concession-confirmation-email.jpg" alt="Synthetic railway concession form confirmation email showing a SAP ID, collection date, and time slot" />
  <figcaption>The confirmation email gives the student something they can refer back to after leaving the submission page.</figcaption>
</figure>

The same principle applies to the daily collection report. It is generated by an authenticated scheduled endpoint, uses IST day boundaries, and includes the records that were not collected, the records collected as expected, and the records collected out of schedule. If there is nothing to report, it skips the email instead of creating noise for the administrators.

The report is shaped around the administrator's next action: how many students were scheduled, who did not collect their slip, who collected it, and which collections happened outside the schedule. That is more useful than sending a raw database export and asking someone to interpret it under pressure.

<figure>
  <img src="/blog/concession-daily-report-email.jpg" alt="Synthetic daily railway concession collection report email with collection totals and exception lists" />
  <figcaption>The daily report turns the operational state into a short list of exceptions an administrator can act on.</figcaption>
</figure>

This is a small example of a broader rule: side effects should not silently redefine the primary operation. The submission is the primary operation. Email is a useful consequence of it, not the thing that decides whether it happened.

## Support is not separate from engineering

The most important lesson has been that support is not what happens after engineering. Support is one of the inputs to engineering.

When an administrator asks for a new rule, that request carries context the code does not have. When a student cannot find their record, the problem may be validation, timing, a duplicate submission, or simply a confusing message. When a collection happens outside the selected date, the right response may be a report change rather than a rejection.

The maintainer has to understand the difference.

That means answering questions, checking the data, reproducing the issue, explaining the current behavior, and deciding whether the fix belongs in the UI, the API, the database, the process, or the documentation. It also means being honest when a change needs coordination before it can be shipped.

There is no clean boundary where the software ends and responsibility begins. If the system is official, the boundary is yours to carry.

## The happy path is not the real process

The documented process is straightforward: a student submits the form, chooses a collection slot, and arrives at the selected time. Real life does not follow documentation that neatly.

Someone forgets to submit the form. Someone submits it but does not show up on the scheduled day. Someone comes back two or three days later with a reasonable explanation and still needs the slip. An administrator may need to help without pretending that the original schedule never existed.

Those cases are where a system can either become brittle or become useful. Rejecting every exception would make the rules simple for the software and frustrating for everyone else. Silently changing the original record would make the dashboard look tidy while losing the truth of what happened.

The solution was to keep the scheduled date and the actual collection separate. An administrator can mark a submission as collected even when the student arrives outside the original schedule. The record keeps its collection timestamp, while the daily report can identify that the collection happened out of schedule. The normal schedule remains meaningful, but an exception does not disappear just because it was handled manually.

The SAP ID profile helps here too. Instead of searching through a list and guessing whether a student has already been handled, an administrator can see the current submission, its collection state, the first submission time, the last update, and the submission history in one place.

This is a small operational distinction with a large effect: exceptions are handled by people, but recorded by the system. That gives the administration team flexibility without turning the database into a story that is no longer true.

The daily report is designed around the same reality. It separates students scheduled for the day from students actually marked collected that day, then calls out the out-of-schedule cases explicitly. A report that only counts the original schedule would be technically consistent and operationally misleading.

That is what I value most about maintaining this project. I did not just get to build a form and move on. I had to learn how a software system earns the right to become official: by fitting the process around it, by making its rules explicit, by giving administrators the tools to operate it, and by showing up when the requirements change.

The public system is [concession.mpst.me](https://concession.mpst.me). The screenshots and email examples in this post use synthetic development data.

The form is the part students see. The real product is the responsibility behind it.
