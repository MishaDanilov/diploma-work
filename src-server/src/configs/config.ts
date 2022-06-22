const Config = {
  server: {
    port: process.env.SERVER_PORT,
  },
  connectionsName: {
    to_postgre: "to_postgre",
  },
  postgreTabels: {
    administration: "administration",
    applicationForWork: "application_for_work",
    targetOfApplication: "target_of_application",
    materialsPreviousWorks: "materials_of_previous_works",
    forecastApplication: "forecast_application",
    employees: "employees",
    informationAboutEmployees: "information_about_employees",
    informationAboutPreviousWorks: "information_about_previous_works",
    listOfGeneralSurveyMeasures: "list_of_general_survey_measures",
    listOfNecessaryMeasuresForDetailedExamination:
      "list_of_necessary_measures_for_detailed_examination",
    materials: "materials",
    standardsOfWork: "standards_of_work",
    technicalConclusion: "technical_conclusion",
  },

  whitelist: process.env.whitelist ? JSON.parse(process.env.whitelist) : [],
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,

  publicRoutes: [
    '/',
    '/api/login',
    '/api/login/admin',
    '/api/registration',
  ],

  headerName: "Token"
};

export default Config;
