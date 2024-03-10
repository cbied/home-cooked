import { useState } from 'react'
import { Form, RangeSlider, Button, ButtonGroup, ButtonToolbar, 
        CheckboxGroup, Checkbox, Grid, Row, Col } from 'rsuite';

const FilterHostOptions = () => {
const [priceValue, setPriceValue] = useState([20, 100]);
const [dinnerOption, setDinnerOption] = useState([]);
const [languageValue, setLanguageValue] = useState([]);


const handleSetCookOption = (value) => {
    if(dinnerOption.includes(value)) {
        let newDinnerOption = dinnerOption.filter(item => item !== value)
        setDinnerOption(newDinnerOption)
    } else {
        let dinnerOptions = [...dinnerOption, value]
        setDinnerOption(dinnerOptions)
    }
}

const handleSetPriceValue = (value) => {
    setPriceValue(value)
}

const CustomButtonGroup = ({ appearance }) => (
    <ButtonToolbar>
    <ButtonGroup 
    style={{ marginTop: 12, width: '40rem' }} 
    justified>
      <Button 
      size="lg"
      appearance={appearance} 
      onClick={() => handleSetCookOption(1)}
      style={dinnerOption.includes(1) ? {backgroundColor: '#f44336'} : {backgroundColor: '#fe6565'}}
      >Cooking</Button>
      <Button 
      appearance={appearance} 
      onClick={() => handleSetCookOption(2)}
      style={dinnerOption.includes(2) ? {backgroundColor: '#f44336'} : {backgroundColor: '#fe6565'}}
      >Cooking and Dinnder</Button>
      <Button 
      appearance={appearance} 
      onClick={() => handleSetCookOption(3)}
      style={dinnerOption.includes(3) ? {backgroundColor: '#f44336'} : {backgroundColor: '#fe6565'}}
      >Dinner</Button>
    </ButtonGroup>
    </ButtonToolbar>
  );

  return (
    <Form className='min-h-80 flex flex-col justify-around p-10'>
    <Form.Group controlId="cookOption" className='flex flex-col'>
        <Form.ControlLabel className='text-3xl font-bold ml-5'>Experience Type</Form.ControlLabel>
        <p className='ml-5'>learn to cook, learn to cook and have dinner, or just show up and have dinner</p>
        <div className="flex justify-center my-10">
            <CustomButtonGroup appearance="primary"/>
        </div>
    </Form.Group>
    <Form.Group controlId="priceRange" className='flex flex-col'>
        <Form.ControlLabel className='text-3xl font-bold ml-5'>Price Range</Form.ControlLabel>
        <p className='ml-5 mb-10'>dinner experience price range before taxes and fees</p>
        <RangeSlider
            max={250}
            min={25}
            defaultValue={[25, 100]}
            constraint={([start, end]) => start < end - 40 && end > start + 40}
            graduated
            progress
            step={25}
            renderMark={mark => {
                return mark;
            }}
            style={{ width: '80%', alignSelf: 'center'}}
            onChange={value => handleSetPriceValue(value)}
            />
    </Form.Group>
    <Form.Group controlId="priceRange" className='mt-10'>
        <Form.ControlLabel className='text-3xl font-bold ml-5'>Host Languages</Form.ControlLabel>
        <CheckboxGroup
            inline
            name="languageList"
            value={languageValue}
            onChange={value => {
                console.log(value, 'onChange');
                setLanguageValue(value);
            }}
            className='my-10'
            >
            <Grid >
            <Row className='h-24'>
            <Col xs={3} className='h-56 flex flex-col justify-around mr-3'>
            <Checkbox value="English">English</Checkbox>
            <Checkbox value="Spanish">Spanish</Checkbox>
            <Checkbox value="French">French</Checkbox>
            <Checkbox value="German">German</Checkbox>
            <Checkbox value="Dutch">Dutch</Checkbox>
            </Col>
            <Col xs={3} className='h-56 flex flex-col justify-around mr-3'>
            <Checkbox value="Italian">Italian</Checkbox>
            <Checkbox value="Chinese">Chinese</Checkbox>
            <Checkbox value="Japanese">Japanese</Checkbox>
            <Checkbox value="Korean">Korean</Checkbox>
            <Checkbox value="Russian">Russian</Checkbox>
            </Col>
            <Col xs={3} className='h-56 flex flex-col justify-around mr-3'>
            <Checkbox value="Arabic">Arabic</Checkbox>
            <Checkbox value="Hindi">Hindi</Checkbox>
            <Checkbox value="Portuguese">Portuguese</Checkbox>
            <Checkbox value="Thai">Thai</Checkbox>
            <Checkbox value="Vietnamise">Vietnamise</Checkbox>
            </Col>
            <Col xs={3} className='h-56 flex flex-col justify-around mr-3'>
            <Checkbox value="Hebrew">Hebrew</Checkbox>
            <Checkbox value="Polish">Polish</Checkbox>
            <Checkbox value="Greek">Greek</Checkbox>
            <Checkbox value="Turkish">Turkish</Checkbox>
            <Checkbox value="Ukrainian">Ukrainian</Checkbox>
            </Col>
            </Row>
            </Grid>
        </CheckboxGroup>
        </Form.Group>
    </Form>
  );
};

export default FilterHostOptions;
