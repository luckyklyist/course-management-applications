import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


function App() {
  const [courses, setCourses] = useState([])

  const fetchCourse = async () => {
    const coursesData = await fetch(`http://localhost:3002/api/v1/admin/courses`);
    const data = await coursesData.json();
    console.log(data);
    const coursesArray = data.courses || []; // Extract the courses array from data
    setCourses(coursesArray);
    return data;
  };
  
  useEffect(() => {
    fetchCourse()

  }, [])

  return (
    <>
      <div className='courses_main'>
        <h2>Course selling websites</h2>

        {courses.map((course) => (
  <div key={course._id}>
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt={course.title}
        height="140"
        image={course.imageLink}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {course.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {course.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  </div>
))}



        <div className="courses">


          Hlelo

        </div>

      </div>
    </>
  )
}

export default App
