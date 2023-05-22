export const createPayload = (state, page = null) => {
    let result = ''
    if(state.query_string){
        result = `?q=${state.query_string}`
    }
    if(state.date_from){
        if(result) result += `&date_from=${state.date_from}`
        else result += `?date_from=${state.date_from}`
    }
    if(state.date_to){
        if(result) result += `&date_to=${state.date_to}`
        else result += `?date_to=${state.date_to}`
    }
    if(state.source){
        if(result) result += `&source=${state.source}`
        else result += `?source=${state.source}`
    }
    if(state.category){
        if(result) result += `&category=${state.category}`
        else result += `?category=${state.category}`
    }
    if(state.author){
        if(result) result += `&author=${state.author}`
        else result += `?author=${state.author}`
    }
    if(state.page || page){
        if(result) result += `&page=${page ? page : state.page}`
        else result += `?page=${+page ? page : state.page}`
    }
    return result
}

export const compareByDate = (b,a) => {
    if (a.date === b.date) {
      return 0;
    }
    return a.date < b.date ? -1 : 1;
  };