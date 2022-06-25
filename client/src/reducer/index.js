const initialState = {
  allDogs: [],
  dogs: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_DOGS":
      return {
        ...state,
        dogs: action.payload,
        allDogs: action.payload,
      };
    /* case 'FILTER_BY_TEMPERAMENTS':
            const allTemperaments = state.dogs
            
            return{
                ...state,

            } */
    case "FILTER_CREATED":
      let allDogs = state.allDogs;
      const createdFilter =
        action.payload === "created"
          ? allDogs.filter((el) => el.createdInDb)
          : allDogs.filter((el) => !el.createdInDb);
      return {
        ...state,
        dogs: action.payload === "all" ? state.allDogs : createdFilter,
      };
    case "ORDER_BY_NAME":
      let dogsOrder =
        action.payload === "name_asc"
          ? state.dogs.sort((a, b) => {
              if (a.name > b.name) return 1;
              if (b.name > a.name) return -1;
              return 0;
            })
          : state.dogs.sort((a, b) => {
              if (a.name > b.name) return -1;
              if (b.name > a.name) return 1;
              return 0;
            });
      return {
        ...state,
        dogs: dogsOrder,
      };
    case 'ORDER_BY_WEIGHT':
        
    default:
      return state;
  }
}

export default rootReducer;
