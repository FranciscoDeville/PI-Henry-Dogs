const initialState = {
  allDogs: [],
  detail: [],
  dogs: [],
  temperaments: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_DOGS":
      return {
        ...state,
        dogs: action.payload,
        allDogs: action.payload,
      };
    case "FILTER_BY_TEMPERAMENTS":
      let all_Dogs = state.allDogs;
      const filterByTemperaments =
        action.payload === "all"
          ? all_Dogs
          : all_Dogs.filter((el) => {
              return el.temperament?.split(", ").includes(action.payload);
            });
      return {
        ...state,
        dogs: filterByTemperaments,
      };
    case 'GET_NAME_DOG':
      return {
        ...state,
        dogs: action.payload
      }
    case "GET_TEMPERAMENTS":
      return {
        ...state,
        temperaments: action.payload,
      };
    case "POST_DOG":
      return { ...state };
    case "FILTER_CREATED":
      var allDogs = state.allDogs;
      const createdFilter =
        action.payload === "created"
          ? allDogs.filter((el) => el.createdInDb)
          : allDogs.filter((el) => !el.createdInDb);
      return {
        ...state,
        dogs: action.payload === "all" ? allDogs : createdFilter,
      };
    case "ORDER_BY_NAME":
      let dogsOrderName =
        action.payload === "name_asc"
          ? state.dogs.sort((a, b) => {
              if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
              if (b.name.toLowerCase() > a.name.toLowerCase()) return -1;
              return 0;
            })
          : state.dogs.sort((a, b) => {
              if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
              if (b.name.toLowerCase() > a.name.toLowerCase()) return 1;
              return 0;
            });
      return {
        ...state,
        dogs: dogsOrderName,
      };
    case "GET_DETAILS":
      return {
        ...state,
        detail: action.payload,
      };
    case "GET_CLEAN":
      return{
        ...state,
        detail: action.payload,
      }
    case "ORDER_BY_WEIGHT":
      let dogsOrderWeight =
        action.payload === "weight_asc"
          ? state.dogs.sort((a, b) => {
              return b.weight_min - a.weight_min;
            })
          : state.dogs.sort((a, b) => {
              return a.weight_min - b.weight_min;
            });
      return {
        ...state,
        dogs: dogsOrderWeight,
      };
    default:
      return state;
  }
}

export default rootReducer;
