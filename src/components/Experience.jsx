export default function Experience() {
  return (
    <section>
      <h2>Professional Experience</h2>

      <div className="card">
        <h3>Veritas Technologies</h3>
        <p className="role">
          Principal Frontend Architect | Jul 2022 – Present
        </p>
        <ul>
          <li>Own frontend architecture and governance for Infoscale / ALTA</li>
          <li>Lead a 14-member cross-functional team</li>
          <li>Designed reusable UI component libraries</li>
          <li>Led Angular modernization and upgrades</li>
          <li>Architected AI-enabled analytics and discovery workflows</li>
        </ul>
      </div>

      <div className="card">
        <h3>Tata Consultancy Services</h3>
        <p className="role">Technical Lead – Frontend | Jun 2021 – Jul 2022</p>
        <ul>
          <li>Owned Angular UI architecture for banking platforms</li>
          <li>Led Agile ceremonies and release planning</li>
        </ul>
      </div>

      <div className="card">
        <h3>Accenture Interactive</h3>
        <p className="role">
          Application Development Senior Analyst | Dec 2018 – Jun 2021
        </p>
        <ul>
          <li>Delivered secure Angular enterprise platforms</li>
          <li>JWT, AWS Cognito, lazy loading, interceptors</li>
        </ul>
      </div>
    </section>
  );
}
