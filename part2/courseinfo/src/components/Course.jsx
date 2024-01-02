const Course = ({ course }) => (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
  
const Header = ({ course }) => <h1>{course}</h1>
  
const Content = ({ parts }) => 
    <>
      {parts.map(part => 
        <Part key={part.id} part={part} />
      )}
    </>
  
const Part = ({ part }) => 
    <p>
      {part.name} {part.exercises}
    </p>
  
  
const Total = ({ parts }) => {
    const sum = parts.map(item => item.exercises).reduce((prev, next) => prev + next)
    return (
      <div>
          <p><b> Total of {sum} exercises</b></p>
      </div>
    )
  }

export default Course