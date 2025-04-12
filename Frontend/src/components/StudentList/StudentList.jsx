import React from 'react'
import { useNavigate } from 'react-router-dom'

const StudentList = () => {
    const Navigate =useNavigate();
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
  return (
    <>
<div className='sl-wrapper'>
<input type="text"  className='sl-search' placeholder='search student'/>

<div className='sl-box'>
  <table>
    <thead>
        <tr>
            <th>Profile Pic</th>
            <th>Full Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Edit</th>
            <th>View</th>
            <th>Delete</th>
            
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
                    <td>{student.email}</td>
                    <td><button>Edit</button></td>
                    <td><button onClick={()=>{Navigate("/dashboard/student-profile/"+student.id,{state:student})}}>view </button></td>
                    <td><button>delete</button></td>
                </tr>
            )
        })
    }

    </tbody>
  </table>
</div>
</div>

    </>
  )
}

export default StudentList