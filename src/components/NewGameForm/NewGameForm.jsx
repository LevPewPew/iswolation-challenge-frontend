import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  DecrementBtn,
  FormErrorMsg,
  IncrementBtn,
  NumberInput,
  SubmitBtn,
  TextInput
} from 'components';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { environment, validation } from 'config';

const { WEB_SERVER } = environment;
const {
  MIN_GROUP_NAME_CHARS,
  MAX_GROUP_NAME_CHARS,
  MIN_PLAYERS_CHARS,
  MAX_PLAYERS_CHARS,
  MIN_PLAYERS_LENGTH,
  MAX_PLAYERS_LENGTH,
  MIN_EXERCISE_NAME_CHARS,
  MAX_EXERCISE_NAME_CHARS,
  MIN_EXERCISES_LENGTH,
  MAX_EXERCISES_LENGTH,
  MIN_REPS_COUNT,
  MAX_REPS_COUNT
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

  const validations = {
    groupName: {
      required: {
        value: true,
        message: 'Required'
      },
      minLength: {
        value: MIN_GROUP_NAME_CHARS,
        message: `Group Name too short, minimum ${MIN_GROUP_NAME_CHARS} characters`
      },
      maxLength: {
        value: MAX_GROUP_NAME_CHARS,
        message: `Group Name too long, maximum ${MAX_GROUP_NAME_CHARS} characters`
      }
    },
    player: {
      required: {
        value: true,
        message: 'Required'
      },
      minLength: {
        value: MIN_PLAYERS_CHARS,
        message: `Name too short, minimum ${MIN_PLAYERS_CHARS} characters`
      },
      maxLength: {
        value: MAX_PLAYERS_CHARS,
        message: `Name too long, maximum ${MAX_PLAYERS_CHARS} characters`
      }
    },
    exercise: {
      required: {
        value: true,
        message: 'Required'
      },
      minLength: {
        value: MIN_EXERCISE_NAME_CHARS,
        message: `Name too short, minimum ${MIN_EXERCISE_NAME_CHARS} characters`
      },
      maxLength: {
        value: MAX_EXERCISE_NAME_CHARS,
        message: `Name too long, maximum ${MAX_EXERCISE_NAME_CHARS} characters`
      }
    },
    reps: {
      required: {
        value: true,
        message: 'Required'
      },
      min: {
        value: MIN_REPS_COUNT,
        message: `Not enough reps, minimum ${MIN_REPS_COUNT} reps`
      },
      max: {
        value: MAX_REPS_COUNT,
        message: `Too many reps, maximum ${MAX_REPS_COUNT} reps`
      }
    }
  }
  
  function GroupNameForm({ setCurrentSubForm }) {
    const { errors, handleSubmit, register } = useForm();
    const onSubmit = (data) => {
      const newFormData = { ...formData, ...data };
      setFormData(newFormData);
      setCurrentSubForm(1);
    };
  
    return (
      <form className="NewGameForm GroupNameForm" onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          name="groupName"
          register={register(validations.groupName)}
          maxLength={MAX_GROUP_NAME_CHARS}
        />
        <FormErrorMsg
          error={errors.groupName}
        />
        <SubmitBtn
          text="Next"
        />
      </form>
    );
  }
  
  function PlayersForm({ setCurrentSubForm }) {
    const { errors, register, handleSubmit } = useForm();
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
            max={MAX_PLAYERS_LENGTH}
            stateSetter={setTotalPlayers}
            stateValue={totalPlayers}
          />
          <DecrementBtn
            min={MIN_PLAYERS_LENGTH}
            stateSetter={setTotalPlayers}
            stateValue={totalPlayers}
          />
        </div>
        {
          [...Array(totalPlayers).keys()].map((i) => (
            <>
              <TextInput
                name={`player${i}`}
                register={register(validations.player)}
                maxLength={MAX_PLAYERS_CHARS}
              />
              <FormErrorMsg
                error={errors[`player${i}`]}
              />
            </>
          ))
        }
        <SubmitBtn
          text="Next"
        />
      </form>
    );
  }
  
  function ExercisesForm() {
    const { errors, register, handleSubmit } = useForm();
    const history = useHistory();
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
      <form className="NewGameForm ExercisesForm" onSubmit={handleSubmit(onSubmit)}>
        <div className="inc-dec-container">
          <p>Total Exercises</p>
          <IncrementBtn
            max={MAX_EXERCISES_LENGTH}
            stateSetter={setTotalExercises}
            stateValue={totalExercises}
            />
          <DecrementBtn
            min={MIN_EXERCISES_LENGTH}
            stateSetter={setTotalExercises}
            stateValue={totalExercises}
          />
        </div>
        {
          [...Array(totalExercises).keys()].map((i) => (
            <>
              <div className="exercise-reps-container">
                <div className="input-error-container">
                  <TextInput
                    name={`exercise${i}`}
                    register={register(validations.exercise)}
                    maxLength={MAX_EXERCISE_NAME_CHARS}
                  />
                  <FormErrorMsg
                    error={errors[`exercise${i}`]}
                  />
                </div>
                <div className="input-error-container">
                  <NumberInput
                    name={`reps${i}`}
                    register={register(validations.reps)}
                    min={MIN_REPS_COUNT}
                    max={MAX_REPS_COUNT}
                  />
                  <FormErrorMsg
                    error={errors[`reps${i}`]}
                  />
                </div>
              </div>
            </>
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
