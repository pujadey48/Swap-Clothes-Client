import React from 'react';
import { Accordion, Container } from 'react-bootstrap';

const Blog = () => {
    return (
        <Container>
      <Accordion defaultActiveKey={['0']} alwaysOpen>
      <Accordion.Item eventKey="0">
        <Accordion.Header> What are the different ways to manage a state in a React application?</Accordion.Header>
        <Accordion.Body>
          
        There are several other ways to manage state​s in React, including the use of: Hooks. React Context API. Apollo Link State.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>How does prototypical inheritance work?</Accordion.Header>
        <Accordion.Body>
        <p>বাংলায়
In English
The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object. Traditionally, in order to get and set the [[Prototype]] of an object, we use Object. getPrototypeOf and Object.</p>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>What is a unit test? Why should we write unit tests?</Accordion.Header>
        <Accordion.Body>
        Unit Testing is a testing method that tests an individual unit of software in isolation. Unit testing for React Apps means testing an individual React Component. Unit testing is a great discipline, which can lead to 40% – 80% reductions in bug density.Well-written unit tests act as documentation for the code. Any developer can quickly look at the tests and know the purpose of your functions. It simplifies the debugging process. Unit testing is an integral part of extreme programming.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="3">
        <Accordion.Header>React vs. Angular vs. Vue?</Accordion.Header>
        <Accordion.Body>
        Vue provides higher customizability and hence is easier to learn than Angular or React. Further, Vue has an overlap with Angular and React with respect to their functionality like the use of components. Hence, the transition to Vue from either of the two is an easy option.
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    </Container>
    );
};

export default Blog;