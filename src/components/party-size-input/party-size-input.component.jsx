import { useState, forwardRef } from 'react';
import { ButtonToolbar, InputNumber, InputGroup, Popover, Whisper, Button } from 'rsuite';

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
    
     
        <div className='flex self-center' style={styles}>
            <InputGroup title='How many people?'>
                <InputNumber className={'custom-input-number'} 
                             value={value} onChange={setValue} 
                             size="lg"
                             min={1}
                             defaultValue={1}/>
            </InputGroup>
          </div>
    
    )
}

export default PartySizeInput;