import React, { useEffect } from 'react';
import { Chart } from 'chart.js/auto';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const Navigate = useNavigate()
  const studentList= [
    {id:1,
      name: "Priya",
      phone: "9199292929",
      email: "demo@gamil.com",
      profilePic :"https://teamjapanese.com/wp-content/uploads/2022/03/boy-in-japanese.jpg"
    },

    {id:2,
        name: "Priyan",
        phone: "9199292929",
        email: "demo@gamil.com",
        profilePic :"https://teamjapanese.com/wp-content/uploads/2022/03/boy-in-japanese.jpg"
      },

      {id:3,
        name: "Priyans",
        phone: "9199292929",
        email: "demo@gamil.com",
        profilePic :"https://teamjapanese.com/wp-content/uploads/2022/03/boy-in-japanese.jpg"
      },


      {id:4,
        name: "Priyansh",
        phone: "9199292929",
        email: "demo@gamil.com",
        profilePic :"https://teamjapanese.com/wp-content/uploads/2022/03/boy-in-japanese.jpg"
      },


      {id:5,
        name: "Priyanshu",
        phone: "9199292929",
        email: "demo@gamil.com",
        profilePic :"https://teamjapanese.com/wp-content/uploads/2022/03/boy-in-japanese.jpg"
      },

      {id:6,
        name: "Priyanashu D",
        phone: "9199292929",
        email: "demo@gamil.com",
        profilePic :"https://teamjapanese.com/wp-content/uploads/2022/03/boy-in-japanese.jpg"
      },

      {id:7,
        name: "Priyanshu Du",
        phone: "9199292929",
        email: "demo@gamil.com",
        profilePic :"https://teamjapanese.com/wp-content/uploads/2022/03/boy-in-japanese.jpg"
      },
]
  useEffect(() => {
    const ctx = document.getElementById('myChart');
    
    const chartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    // Cleanup to destroy chart on component unmount
    return () => {
      chartInstance.destroy();
    };
  }, []);

  return (
    <>
      <div>
        <div className="home-first-row">
          <div className="home-box box-1">
            <h2> Course </h2>
            <h1> No: 125</h1>
          </div>
          <div className="home-box box-2">
            <h2> All Student</h2>
            <h1> No-1450</h1>
          </div>
          <div className="home-box box-3">
            <h2> Total Payment</h2>
            <h1> Rs:34454</h1>
          </div>
        </div>

        <div className="home-second-row">
          <div className="chart-box">
            <canvas id="myChart"></canvas>
          </div>

          <div className="recent-invoices">
            <h2>Recent Student</h2>
            <div className="">
            <div className='sl-box'>
  <table>
    <thead>
        <tr>
            <th>Profile Pic</th>
            <th>Full Name</th>
            <th>Phone</th>
            <th>View</th>
            
        </tr>
    </thead>
    <tbody>
    { 
        studentList.map((student)=>{
            return (
                <tr key={student.id}>
                    <td><img src={student.profilePic} alt="" /></td>
                    <td>{student.name}</td>
                    <td>{student.phone}</td>
                    
                   
                    <td><button onClick={()=>{Navigate("/dashboard/student-profile/"+student.id,{state:student})}}>view </button></td>
                    
                </tr>
            )
        })
    }

    </tbody>
  </table>
</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
