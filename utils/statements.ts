const STATISTICS_QUERY = {
  name: "statistics",
  statement: `select count(distinct a.activities)   as projectsCompleted,
                     max(r.roles.team.biggest_size) as maxTeamSize,
                     date_diff('year', min(r.roles.period.start),
                               current_date())      as yearsOfExperience
              from (select unnest(activities) as activities, uid
                    from (select unnest(experiences, recursive:=true)
                          from read_parquet('cv.parquet'))) as a
                       join (select unnest(roles) as roles, uid
                             from (select unnest(experiences, recursive:=true)
                                   from read_parquet('cv.parquet'))) as r
                            on a.uid = r.uid
              where r.roles.kind = 'software_engineering'
                and (r.roles.period.type = 'employee' or
                     r.roles.period.type = 'contractor')
                and a.activities.type = 'software_engineering'`,
  parameters: {
    table: "cv.parquet",
  },
};

const EXPERTISE_QUERY = {
  name: "expertise",
  statement: `with all_expertises as (select e.uid,
                                             e.name,
                                             e.type,
                                             e.kind,
                                             e.category,
                                             sum(ues.hours) as hours,
                                             sum(ues.days)  as days
                                      from (select unnest(p.expertises)                           as ue,
                                                   date_diff('days', p.start, CASE
                                                                                  WHEN p.start = p.end
                                                                                      THEN date_add(p.end, INTERVAL 31 day)
                                                                                  ELSE p.end END) *
                                                   8                                              as hours,
                                                   date_diff('days', p.start, CASE
                                                                                  WHEN p.start = p.end
                                                                                      THEN date_add(p.end, INTERVAL 31 day)
                                                                                  ELSE p.end END) as days,
                                                   p.start                                        as period_start
                                            from (select unnest(e.activities, recursive:=true)
                                                  from (select unnest(experiences, recursive:=true)
                                                        from read_parquet('cv.parquet')) as e) as p)
                                               as ues
                                               join read_parquet('expertises.parquet') as e
                                                    on ue.uid = e.uid
                                      group by e.uid, e.name, e.type, e.kind, e.category)
              select uid, name, type, kind, category, hours ::int as totalHours, days
              from all_expertises ae
              where ae.uid in (select distinct e.uid
                               from (select unnest(p.expertises) as e, p.start
                                     from (select unnest(e.activities, recursive:=true)
                                           from (select unnest(experiences, recursive:=true)
                                                 from read_parquet('cv.parquet')) as e) as p) as ues
                               where ues.start >=
                                     date_add(current_date(), - INTERVAL 7 year))`,
  parameters: {
    table: "cv.parquet",
    backward_years: 7,
  },
};

const CONTACT_QUERY = {
  name: "contact",
  statement: `select name, c.email, c.linkedin, c.github, c.x
              from (select unnest(contact) as c, name
                    from read_parquet('cv.parquet')) as c`,
  parameters: {
    table: "cv.parquet",
  },
};

const queries = {
  CONTACT_QUERY,
  STATISTICS_QUERY,
  EXPERTISE_QUERY,
};

export default queries;
