import React, {useEffect, useState} from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";

function Projects() {
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    try {
      const response = await fetch("https://amazon-24ttl-6a495dfd71bd.herokuapp.com/api/portfolio");
      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }
      const data = await response.json();
      setProjects(data.items);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
      <Container fluid className="project-section">
        <Particle />
        <Container>
          <h1 className="project-heading">
            My Recent <strong className="purple">Works </strong>
          </h1>
          <p style={{ color: "white" }}>
            Here are a few projects I've worked on recently.
          </p>
          <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
            {projects.map((project, index) => (
                <Col md={4} className="project-card" key={index}>
                  <ProjectCard
                      imgPath={project.image.url}
                      isBlog={false}
                      title={project.title}
                      url={project.link}
                      description={project.text}
                  />
                </Col>
            ))}
          </Row>
        </Container>
      </Container>
  );
}

export default Projects;
