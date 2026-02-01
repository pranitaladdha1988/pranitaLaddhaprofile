import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";
import Chatbot from "./Chatbot";

export default function AI() {
    const { t } = useContext(LanguageContext);
    const projects = t("ai.projects");

    return (
        <>
            <section>
                <h2>{t("ai.intro")}</h2>
                <Chatbot />
            </section>
            <section>
                <h2>{t("ai.title")}</h2>
                {projects.map((project, idx) => (
                    <div className="card" key={idx}>
                        <h3>{project.name}</h3>
                        <p>{project.description}</p>
                    </div>
                ))}
            </section>
        </>
    );
}