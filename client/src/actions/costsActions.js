const GET_COSTS = "GET_COSTS";
const ADD_COST = "ADD_COST";

const getCosts = costs => {
  return {
    type: GET_COSTS,
    costs
  };
};
const addCost = costs => {
  return {
    type: ADD_COST,
    costs
  };
};

export { getCosts, addCost };
