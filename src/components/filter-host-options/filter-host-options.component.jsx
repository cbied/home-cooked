import { useState } from 'react'
import { Form, RangeSlider, Button, ButtonGroup } from 'rsuite';

const FilterHostOptions = () => {
const [priceValue, setPriceValue] = useState([20, 100]);
const [dinnerOption, setDinnerOption] = useState("CookAndDinner");


const handleSetCookOption = (value) => {
    setDinnerOption(value)
    console.log(value)
}

const handleSetPriceValue = (value) => {
    setPriceValue(value)
}

const CustomButtonGroup = ({ appearance }) => (
    <ButtonGroup 
    style={{ marginTop: 12, width: '40rem' }} 
    justified>
      <Button 
      size="lg"
      appearance={appearance} 
      onClick={() => handleSetCookOption('Cooking')}
      className="active:bg-stone-600"
      >Cooking</Button>
      <Button 
      appearance={appearance} 
      onClick={() => handleSetCookOption('Cooking and Dinner')}
      >Cooking and Dinnder</Button>
      <Button 
      appearance={appearance} 
      onClick={() => handleSetCookOption('Dinner')}
      >Dinner</Button>
    </ButtonGroup>
  );

  return (
    <div className='min-h-80 flex flex-col justify-around'>
    <Form.Group controlId="cookOption" className='flex justify-center'>
        <CustomButtonGroup appearance="primary" />
    </Form.Group>
    <RangeSlider
        max={500}
        min={20}
        defaultValue={[20, 100]}
        constraint={([start, end]) => start < end - 40 && end > start + 40}
        onChange={value => handleSetPriceValue(value)}
        />
    </div>
  );
};

export default FilterHostOptions;
