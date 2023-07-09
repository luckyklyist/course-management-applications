import { useState } from 'react'
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
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='courses_main'>
        <h2>Course selling websites</h2>

        <div className="courses">
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              alt="green iguana"
              height="140"
              image="https://logicproindia.com/wp-content/uploads/2016/05/python-logo.jpg"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Python Course
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Become a python developer and earn the six figure salary
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>



        </div>

      </div>
    </>
  )
}

export default App
