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
    const statistics = ref(
      (await database.queryOne(
        ExperienceStatistics,
        queries.STATISTICS_QUERY.statement,
      )) || new ExperienceStatistics(),
    );
    // FIXME: This is a temporary fix for the missing locWritten value
    statistics.value.locWritten = 33242;
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
