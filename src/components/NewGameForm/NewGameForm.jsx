import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  DecrementBtn,
  IncrementBtn,
  SubmitBtn,
  TextInput
} from 'components';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { environment, validation } from 'config';

const { WEB_SERVER } = environment;
const {
  MIN_PLAYERS,
  MAX_PLAYERS,
  MIN_EXERCISES,
  MAX_EXERCISES,
} = validation;

function NewGameForm() {
  const [ currentSubForm, setCurrentSubForm ] = useState(0);
  const [ formData, setFormData ] = useState({});

  const subForms = [
    <GroupNameForm
      setCurrentSubForm={setCurrentSubForm}
    />,
    <PlayersForm
      setCurrentSubForm={setCurrentSubForm}
    />,
    <ExercisesForm
      setCurrentSubForm={setCurrentSubForm}
    />
  ]
  
  function GroupNameForm(props) {
    const { setCurrentSubForm } = props;
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
      const newFormData = { ...formData, ...data };
      setFormData(newFormData);
      setCurrentSubForm(1);
    };
  
    return (
      <form className="NewGameForm GroupNameForm" onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          name="groupName"
          register={register}
        />
        <SubmitBtn
          text="Next"
        />
      </form>
    );
  }
  
  function PlayersForm(props) {
    const { setCurrentSubForm } = props;
    const { register, handleSubmit } = useForm();
    const [ totalPlayers, setTotalPlayers ] = useState(1);

    const onSubmit = (data) => {
      const newFormData = { ...formData, players: Object.values(data) };
      setFormData(newFormData);
      setCurrentSubForm(2);
    };
  
    return (
      <form className="NewGameForm PlayersForm" onSubmit={handleSubmit(onSubmit)}>
        <div className="inc-dec-container">
          <p>Total Players</p>
          <IncrementBtn
            max={MAX_PLAYERS}
            stateSetter={setTotalPlayers}
            stateValue={totalPlayers}
          />
          <DecrementBtn
            min={MIN_PLAYERS}
            stateSetter={setTotalPlayers}
            stateValue={totalPlayers}
          />
        </div>
        {
          [...Array(totalPlayers).keys()].map((i) => (
            <TextInput
              name={`player${i}`}
              register={register}
            />
          ))
        }
        <SubmitBtn
          text="Next"
        />
      </form>
    );
  }
  
  function ExercisesForm(props) {
    const history = useHistory();
    
    const { register, handleSubmit } = useForm();
    const [ totalExercises, setTotalExercises] = useState(1);

    const onSubmit = async (data) => {
      let exercises = [];
      let obj = {};
      Object.values(data).forEach((item, index) => {
        if (index % 2 === 0) {
          obj.name = item;
        } else {
          obj.reps = item;
          exercises.push(obj);
          obj = {};
        }
      });
      const newFormData = {
        ...formData,
        exercises
      };

      setFormData(newFormData);
      const res = await axios.post(`${WEB_SERVER}/games`, newFormData);
      history.push(`/${res.data._id}`);
    };
  
    return (
      <form className="NewGameForm PlayersForm" onSubmit={handleSubmit(onSubmit)}>
        <div className="inc-dec-container">
          <p>Total Exercises</p>
          <IncrementBtn
            max={MAX_EXERCISES}
            stateSetter={setTotalExercises}
            stateValue={totalExercises}
            />
          <DecrementBtn
            min={MIN_EXERCISES}
            stateSetter={setTotalExercises}
            stateValue={totalExercises}
          />
        </div>
        {
          [...Array(totalExercises).keys()].map((i) => (
            <div className="exercise-reps">
              <TextInput
                name={`exercise${i}`}
                register={register}
              />
              <TextInput
                name={`reps${i}`}
                register={register}
              />
            </div>
          ))
        }
        <SubmitBtn
          text="Begin Iswolation"
        />
      </form>
    );
  }

  return (
    subForms[currentSubForm]
  );
}

export default NewGameForm;
