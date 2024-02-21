import { useState } from 'react';
import { InputNumber, InputGroup, Stack } from 'rsuite';
import './party-size-input.styles.less';


const PartySizeInput = ({ largeStyles }) => {
    const [value, setValue] = useState('');
    
    const handleMinus = (event) => {
      event.stopPropagation()
      if(value > 1) {
        setValue(parseInt(value, 10) - 1);
      }
    };
    const handlePlus = (event) => {
        event.stopPropagation()
      if(isNaN(value) || value === '') {
        setValue(1)
      } else {
        setValue(parseInt(value, 10) + 1);
      }
    };
    
 
    return (
        <Stack spacing={6} className='flex self-center' style={largeStyles}>
          <InputGroup title='How many people?'>
            <InputGroup.Button onClick={handleMinus}>-</InputGroup.Button>
            <InputNumber 
                        className={'custom-input-number'} 
                        value={value} 
                        onChange={setValue} 
                        size="lg"
                        placeholder="How many people?"
                        min={1}
                        />
            <InputGroup.Button onClick={handlePlus}>+</InputGroup.Button>
          </InputGroup>
        </Stack>
    
    )
}

export default PartySizeInput;