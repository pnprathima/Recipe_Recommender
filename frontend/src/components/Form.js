import React, { Component } from "react";
import { HStack, Button, Input, InputGroup, Switch, Box, VStack, Text, InputRightElement, FormLabel, Badge } from "@chakra-ui/react";
import recipeDB from "../apis/recipeDB";
import TypeAheadDropDown from "./TypeAheadDropDown";

// Form component to maintain input form
class Form extends Component {
  // constructor for Form Component
  // We maintain user input as a state object
  constructor() {
    super();

    this.state = {
      // cuisine : "Any",
      //numberIngredients : 0,
      ingredients: new Set(),
      cuisineState: 0,
      cuisine: "",
    };
  }

  async componentDidMount(){
    try {
      const response = await recipeDB.get("/recipes/callIngredients/");
      this.setState({
        ingredient_list: response.data,
        cuisine_list: ['Mexican','South Indian','Chinese','Thai','Japanese','Gujarati','North Indian','Lebanese','Mediterranean',
        'Middle East','Italian','Korean','Continental','Greek','Latin','American', "Other", "Swedish", "Latvian", "Italian",
        "Spanish", "American","Scottish","British","Thai","Japanese","Indian","Canadian","Russian","Jewish","Polish","German","French","Hawaiian",
        "Brazilian", "Peruvian","Cuban","Tibetian","Salvadorian","Egyptian","Greek","Belgian","Irish","Welsh","Mormon","Cajun","Portugese","Turkish","Haitian",
        "Tahitian","Kenyan","Korean","Algerian","Nigerian","Libyan"]
      });
    } catch (err) {
      console.log(err);
    }
  }
  //  cuisine_list =   ['Mexican','South Indian','Chinese','Thai','Japanese','Gujarati','North Indian','Lebanese','Mediterranean',
  // 'Middle East','Italian','Korean','Continental','Greek','Latin','American', "Other", "Swedish", "Latvian", "Italian",
  // "Spanish", "American","Scottish","British","Thai","Japanese","Indian","Canadian","Russian","Jewish","Polish","German","French","Hawaiian",
  // "Brazilian", "Peruvian","Cuban","Tibetian","Salvadorian","Egyptian","Greek","Belgian","Irish","Welsh","Mormon","Cajun","Portugese","Turkish","Haitian",
  // "Tahitian","Kenyan","Korean","Algerian","Nigerian","Libyan"]

  // function to change cuisine state, triggered on selection of a cuisine item.
  /*cuisineUpdate = (event) => {

        this.setState (
            {
                cuisine : event.target.value,
                numberIngredients : this.state.numberIngredients,
                ingredients : this.state.ingredients
            }, () => console.log( this.state )
        )
    }
    */
  // function to update the maximum number of ingredients in the state.
  /*numberUpdate = (event) =>
    {
        this.setState (
            {
                cuisine : this.state.cuisine,
                numberIngredients: event.target.value,
                ingredients:this.state.ingredients
            }, () => console.log( this.state )
        )
    }*/

  

  // function to display the ingredients added by the user upto that point.
  printHander = () => {
    // converting the set into an array, to make it iterable
    const items = [...this.state.ingredients];

    // mapping each item to be displayed as a list item
    const list_items = items.map((item) => (
      <Badge id={item} m={1} _hover={{cursor: "pointer"}} onClick={this.removeHandler} colorScheme="green">
        {item}
      </Badge>
    ));

    return <ul class="addedIngredientList">{list_items}</ul>;
  };

  // fucntion to add ingredients to the inredients (set datastructure) in App's state
  // triggered by clicking add item button
  addHandler = (event) => {
    const ingredient = document.getElementById("ingredient").value;

    this.setState(
      {
        //cuisine : this.state.cuisine,
        //numberIngredients : this.state.numberIngredients,
        ingredients: new Set(this.state.ingredients).add(ingredient),
      },
      () => console.log(this.state)
    );

    document.getElementById("ingredient").value = "";
  };

  // fucntion to add ingredients to the inredients (set datastructure) in App's state
  // triggered by clicking item that is displayed ysing printHandler function
  removeHandler = (event) => {
    console.log("clicked tag")
    var discardIngredient = event.target.id;
    var ingredientList = this.state.ingredients;

    ingredientList.delete(discardIngredient);

    this.setState(
      {
        //cuisine : this.state.cuisine,
        //numberIngredients : this.state.numberIngredients,
        ingredients: ingredientList,
      },
      () => console.log(this.state)
    );
  };

  handleSendEmail = (event) => {
    console.log(event.target.checked);
  }

  // function to send the data to the parent App component
  // uses the function that is sent through props from the App Component
  handleSubmit = (event) => {
    // this.setState(
    //   {
    //     //cuisine : this.state.cuisine,
    //     //numberIngredients : this.state.numberIngredients,
    //
    //     ingredients: new Set(this.state.ingredients).add(
    //       document.getElementById("cuisine").value
    //     ),
    //   },
    //   () => console.log(this.state)
    // );

    this.setState(
      {
        //cuisine : this.state.cuisine,
        //numberIngredients : this.state.numberIngredients,

        cuisine: document.getElementById("cuisine").value,
      },
      () => console.log(this.state)
    );

    event.preventDefault();
    var dict = {};
    dict["ingredient"] = this.state.ingredients;
    dict["cuisine"] = document.getElementById("cuisine").value;
    dict["email_id"] = document.getElementById("email_id").value;
    dict["flag"] = document.getElementById("Send_email").checked;
    //this.props.sendFormData(this.state.cuisine, this.state.numberIngredients,this.state.ingredients)
    this.props.sendFormData(dict);
    console.log(dict);
    document.getElementById("cuisine").value = "";
    document.getElementById("email_id").value = "";
  };

  


  // render function dispays the UI content i.e the form content
  render() {
    {
      /* const cuisine_list = [ "Any", "Swedish", "Latvian", "Italian",
        "Spanish", "American","Scottish","British","Thai","Japanese",
        "Indian","Canadian","Russian","Jewish","Polish","German","French","Hawaiian",
        "Brazilian", "Peruvian","Cuban","Tibetian","Salvadorian","Egyptian","Greek",
        "Belgian","Irish","Welsh","Mormon","Cajun","Portugese","Turkish","Haitian",
    "Tahitian","Kenyan","Korean","Algerian","Nigerian","Libyan" ]*/
  
    }

    // returns jsx element
    return (
      <>
        <Box borderRadius={"lg"} border="2px" boxShadow={"lg"} borderColor={"gray.100"} fontFamily="regular" m={10} width={"23%"} height="fit-content" p={5}>
          <VStack spacing={'5'} alignItems={"flex-start"}>
            <Text fontSize={"larger"} fontWeight={"semibold"}>Get A Recipe</Text>
            <InputGroup variant={"filled"} zIndex={+2}>
              {/* <InputLeftElement pointerEvents='none'>
                            <FontAwesomeIcon size="lg" icon={faLocationDot} />
                        </InputLeftElement> */}
              <TypeAheadDropDown  iteams={this.state.ingredient_list} placeholder_inp = {'Ingredients'} id_inp={'ingredient'} />
              {/* <Input size={"lg"} type='text' id="ingredient" placeholder='Ingredients'/> */}
              <InputRightElement>
                <Button mt={2} mr={2} onClick={this.addHandler}>Add</Button>
              </InputRightElement>
            </InputGroup>
            <HStack direction="row"> 
               {this.printHander()}
            </HStack>
            <InputGroup variant={"filled"} zIndex={+1}>
              {/* <InputLeftElement pointerEvents='none'>
                            <FontAwesomeIcon size="lg" icon={faCalendarDays} />
                            </InputLeftElement> */}
              <TypeAheadDropDown  iteams={this.state.cuisine_list} placeholder_inp = {'Cuisine'} id_inp={'cuisine'} />

              {/* <Input type="text" id="cuisine" color={"gray.500"} size={"lg"} placeholder='Cuisine' /> */}
            </InputGroup>
            <InputGroup variant={"filled"}>
              {/* <InputLeftElement pointerEvents='none'>
                            <FontAwesomeIcon size="lg" icon={faClock} />
                            </InputLeftElement> */}
              {/* <Select textAlign={"left"} size={"lg"} color={"gray.500"} variant={"filled"} placeholder="Time" >
                            <option value='option1'>Option 1</option>
                            <option value='option2'>Option 2</option>
                            <option value='option3'>Option 3</option>
                        </Select> */}
              <Input data-testid="email_id" type="text" id="email_id" color={"gray.500"} size={"lg"} placeholder='Email' />
              </InputGroup>
              <InputGroup variant={"filled"}>
                <FormLabel htmlFor='email-alerts' mb='0'>
                  Enable email alert?
                  <Switch ml={2} id="Send_email" name="email" size='md' />
                </FormLabel>
              </InputGroup>

            <Button data-testid="submit" id="submit" onClick={this.handleSubmit} width={"100%"} _hover={{ bg: 'black', color: "gray.100" }} color={"gray.600"} bg={"green.300"}>Search Recipes</Button>

          </VStack>
        </Box>
        {/* <div class="formOutercontainer">
        <form onSubmit={this.handleSubmit}>
          <div className="row pb-1">
            <div className="input-group col-lg-4 bg-danger text-white">
              <label class="sideLabel"> Ingredient: </label> <br />
              <div className="input-group-append">
                <Input type="text" id="ingredient" />

                <Button onClick={this.addHandler} type="button" id="addButton">
                  {" "}
                  Add item{" "} 
                </Button>
              </div>
            </div>
          </div>

          <div className="row pb-1">
            <div className="input-group col-lg-4 bg-danger text-white">
              <label class="sideLabel"> Cuisine: </label> <br />
              <div className="input-group-append">
                <Input type="text" id="cuisine" />
              </div>
            </div>
          </div>

          <div className="row pb-1">
            <div className="input-group col-lg-4 bg-danger text-white">
              <label class="sideLabel"> Enter Email ID: </label> <br />
              <div className="input-group-append">
                <input type="text" id="email_id" />
                <div>
                  <label>
                     <Input type="checkbox" id="Send_email" name="email" /> 
                    <Switch id="Send_email" name="email" size='md' />
                    Send
                    me email
                  </label>
                </div>

                <div className="row pb-1">
                  <div className="input-group col-lg-4">
                    <label class="sideLabel">Added Items:</label>
                    <br />
                    <br />
                    <br />
                    {this.printHander()}
                  </div>
                </div>
                {/*
                     <div className="row pb-1">
                    <div className="input-group col-lg-4">
                        <label class='sideLabel'>Maximum Number of Ingredients: </label><br/>
                        <div className="input-group-append">
                        <input type = "number" id = "NoIngredient" onChange = {this.numberUpdate} />
                        </div>
                    </div>
                    </div>

                    <div className="row pb-1">
                    <div className="input-group col-lg-4">
                        <label class='sideLabel'> Cusine Selection: </label><br/><br/>
                        <select value={this.state.cuisine} onChange={this.cuisineUpdate} >
                            {
                                cuisine_list.map( (category, i) => <option key = {i}> {category} </option> )
                            }
                        </select>
                    </div>
                        </div>*/}

        {/*<div className="row pb-1">
                  <div className="input-group col-lg-4">
                    <Button
                      type="button"
                      id="submit"
                      onClick={this.handleSubmit}
                    >
                      <h4> Search Recipes </h4>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div> */}
      </>
    );
  }
}

export default Form;
