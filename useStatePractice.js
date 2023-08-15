import {useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';

function KatyasMeets() {
    //can only use hooks inside function components
    // hooks need to be called the same way. can't be nested, must be top level. not inside if functions/ conditions etc.
    // usestate always return an array with 2 values: 1. count, 2. function that updates state
 
    const[meet, updateMeetResults] = useState ({
        squat: 175,
        bench: 95,
        deadlift: 190,
        total
    });

  //  const newTotal = () => {
   //     setNotificationHandler(previousState => { return {...previousState, bench:"100"} }); }

function update(){
    updateMeetResults(newTotal => squat+bench+deadlift+count*10);
    updateMeetResults(newSquat => squat+count*2.5);
    updateMeetResults(newBench =>bench+count*2.5);
    updateMeetResults(newDeadlift => deadlift+count*5)
}

   // when we update state component re-renders
    return <h1> My best squat is {squat} kg . </h1>
    return <h1> My best bench is {bench} kg . </h1>
    return <h1> My best deadlift is {deadlift} kg . </h1>
    return <h1> My best total is {update()} kg . </h1>
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<BestMeet />);

export default KatyasMeets;