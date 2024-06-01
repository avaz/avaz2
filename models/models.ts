class Contact {
  name: string = "";
  email: string = "";
  linkedin: string = "";
  github: string = "";
  x: string = "";
}

class ExperienceStatistics {
  yearsOfExperience: number = 0;
  projectsCompleted: number = 0;
  maxTeamSize: number = 0;
  locWritten: number = 0;
  programmingLanguages: Skill[] = [];
  skills: Skill[] = [];
}

class Skill {
  uid: string = "";
  name: string = "";
  totalHours: number = 0;
  type: string = "";
  kind: string = "";
  category: string = "";
}

class Expertise {
  uid: string = "";
  name: string = "";
  type: string = "";
  kind: string = "";
}

export { Contact, Skill, ExperienceStatistics, Expertise };
