import { useDatabase } from "#imports";
import { ExperienceStatistics, Skill } from "#imports";
import queries from "~/utils/statements";
import { Contact } from "~/models/models";

export default () => {
  async function getContact() {
    const database = useDatabase();
    return await database.queryOne(Contact, queries.CONTACT_QUERY.statement);
  }

  async function getStatistics() {
    const database = useDatabase();
    const statistics = ref<ExperienceStatistics>({
      yearsOfExperience: 0,
      projectsCompleted: 0,
      maxTeamSize: 0,
      locWritten: 0,
      programmingLanguages: [],
      skills: [],
    });
    const partial = await database.queryOne(
      ExperienceStatistics,
      queries.STATISTICS_QUERY.statement,
    );
    if (partial) {
      statistics.value = partial;
      // FIXME: This is a temporary fix for the missing locWritten value
      statistics.value.locWritten = 30;
    }
    const skills = await database.query(
      Skill,
      queries.EXPERTISE_QUERY.statement,
    );
    statistics.value.skills = skills.filter(
      (skill: Skill) => skill.type !== "programming_language",
    );
    statistics.value.programmingLanguages = skills.filter(
      (s) => s.type === "programming_language" && s.totalHours > 2000,
    );
    return statistics;
  }

  return {
    getContact,
    getStatistics,
  };
};
