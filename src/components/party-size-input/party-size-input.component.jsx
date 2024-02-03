import { useState, forwardRef } from 'react';
import { InputNumber, InputGroup, Stack } from 'rsuite';

const styles = {
    height: 'auto'
}

const PartySizeInput = () => {

    const [value, setValue] = useState(0);
    const handleMinus = (event) => {
        
      setValue(parseInt(value, 10) - 1);
    };
    const handlePlus = (event) => {
        console.log(event)
        event.stopPropagation()

      setValue(parseInt(value, 10) + 1);
    };
    
   


    return (
    
     
        <Stack className='flex self-center' style={styles}>
            <InputGroup title='How many people?'>
                <InputNumber className={'custom-input-number'} 
                             value={value} onChange={setValue} 
                             size="lg"
                             min={1}
                             defaultValue={1}
                             placeholder="How many people?"/>
            </InputGroup>
          </Stack>
    
    )
}

export default PartySizeInput;