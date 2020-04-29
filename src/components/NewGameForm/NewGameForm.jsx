import React, { Fragment, useRef, useState } from 'react';
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
import { animated as a, useChain, useSpring } from 'react-spring';

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
  };

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
  ];

  const impactVibrationSpring = {
    from: {
      impactVibration: 0
    },
    to: {
      impactVibration: 2
    },
    config: {
      tension: 6400,
      friction: 5,
      clamp: true
    }
  };
  const settleVibrationSpring = {
    from: {
      settleVibration: 0
    },
    to: {
      settleVibration: -2
    },
    config: {
      tension: 6400,
      friction: 5,
    }
  };
  const xSpring = {
    from: {
      x: -2000
    },
    to: {
      x: 0
    },
    config: {
      tension: 1500,
      friction: 60,
      clamp: true
    },
  };

  function GroupNameForm({ setCurrentSubForm }) {
    const { errors, handleSubmit, register } = useForm();
    const onSubmit = (data) => {
      const newFormData = { ...formData, ...data };
      setFormData(newFormData);
      setCurrentSubForm(1);
    };

    const impactVibrationRef = useRef();
    const settleVibrationRef = useRef();
    const xRef = useRef();
    const { impactVibration } = useSpring({
        ref: impactVibrationRef,
        ...impactVibrationSpring
    });
    const { settleVibration } = useSpring({
      ref: settleVibrationRef,
      ...settleVibrationSpring
    });
    const { x } = useSpring({
      ref: xRef,
      ...xSpring
    });
    useChain([xRef, impactVibrationRef, settleVibrationRef]);
    const impactVibrationStyle = {
      transform: impactVibration.interpolate((i) => `rotateZ(${i}deg)`),
      transformOrigin: "100% 50%"
    };
    const settleVibrationStyle = {
      transform: settleVibration.interpolate((s) => `rotateZ(${s}deg)`),
      transformOrigin: "100% 50%"
    };
    const xStyle = {
      transform: x.interpolate((x) => `translateX(${x}px)`)
    };
  
    return (
      <a.div style={xStyle}>
        <a.div style={impactVibrationStyle}>
          <a.form
            className="NewGameForm GroupNameForm"
            onSubmit={handleSubmit(onSubmit)}
            style={settleVibrationStyle}
          >
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
          </a.form>
        </a.div>
      </a.div>
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

    const impactVibrationRef = useRef();
    const settleVibrationRef = useRef();
    const xRef = useRef();
    const { impactVibration } = useSpring({
        ref: impactVibrationRef,
        ...impactVibrationSpring
    });
    const { settleVibration } = useSpring({
      ref: settleVibrationRef,
      ...settleVibrationSpring
    });
    const { x } = useSpring({
      ref: xRef,
      ...xSpring
    });
    useChain([xRef, impactVibrationRef, settleVibrationRef]);
    const impactVibrationStyle = {
      transform: impactVibration.interpolate((i) => `rotateZ(${i}deg)`),
      transformOrigin: "100% 50%"
    };
    const settleVibrationStyle = {
      transform: settleVibration.interpolate((s) => `rotateZ(${s}deg)`),
      transformOrigin: "100% 50%"
    };
    const xStyle = {
      transform: x.interpolate((x) => `translateX(${x}px)`)
    };
  
    return (
      <a.div style={xStyle}>
        <a.div style={impactVibrationStyle}>
          <a.form
            className="NewGameForm PlayersForm"
            onSubmit={handleSubmit(onSubmit)}
            style={settleVibrationStyle}
          >
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
                <Fragment key={i}>
                  <TextInput
                    name={`player${i + 1}`}
                    register={register(validations.player)}
                    maxLength={MAX_PLAYERS_CHARS}
                  />
                  <FormErrorMsg
                    error={errors[`player${i + 1}`]}
                  />
                </Fragment>
              ))
            }
            <SubmitBtn
              text="Next"
            />
          </a.form>
        </a.div>
      </a.div>
    );
  }
  
  function ExercisesForm() {
    const { errors, register, handleSubmit } = useForm();
    const history = useHistory();
    const [ totalExercises, setTotalExercises] = useState(1);

    const onSubmit = async (data) => {
      let exercises = [];
      let obj = {};
      Object.values(data).forEach((item, i) => {
        if (i % 2 === 0) {
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

    const impactVibrationRef = useRef();
    const settleVibrationRef = useRef();
    const xRef = useRef();
    const { impactVibration } = useSpring({
        ref: impactVibrationRef,
        ...impactVibrationSpring
    });
    const { settleVibration } = useSpring({
      ref: settleVibrationRef,
      ...settleVibrationSpring
    });
    const { x } = useSpring({
      ref: xRef,
      ...xSpring
    });
    useChain([xRef, impactVibrationRef, settleVibrationRef]);
    const impactVibrationStyle = {
      transform: impactVibration.interpolate((i) => `rotateZ(${i}deg)`),
      transformOrigin: "100% 50%"
    };
    const settleVibrationStyle = {
      transform: settleVibration.interpolate((s) => `rotateZ(${s}deg)`),
      transformOrigin: "100% 50%"
    };
    const xStyle = {
      transform: x.interpolate((x) => `translateX(${x}px)`)
    };
  
    return (
      <a.div style={xStyle}>
        <a.div style={impactVibrationStyle}>
          <a.form
            className="NewGameForm ExercisesForm"
            onSubmit={handleSubmit(onSubmit)}
            style={settleVibrationStyle}
          >
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
                <Fragment key={i}>
                  <div className="exercise-reps-container">
                    <div className="input-error-container">
                      <TextInput
                        name={`exercise${i + 1}`}
                        register={register(validations.exercise)}
                        maxLength={MAX_EXERCISE_NAME_CHARS}
                      />
                      <FormErrorMsg
                        error={errors[`exercise${i + 1}`]}
                      />
                    </div>
                    <div className="input-error-container">
                      <NumberInput
                        name={`reps${i + 1}`}
                        register={register(validations.reps)}
                      />
                      <FormErrorMsg
                        error={errors[`reps${i + 1}`]}
                      />
                    </div>
                  </div>
                </Fragment>
              ))
            }
            <SubmitBtn
              text="Begin Iswolation"
            />
          </a.form>
        </a.div>
      </a.div>
    );
  }

  return (
    subForms[currentSubForm]
  );
}

export default NewGameForm;
