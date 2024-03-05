import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPartySize } from '../../store/experience-finder-slice/experience-finder-slice';
import { InputNumber, InputGroup, Stack } from 'rsuite';
import './party-size-input.styles.less';


const PartySizeInput = () => {
    const dispatch = useDispatch();
    const partySizeValue = useSelector(state => state.experienceFinder.partySize)
    const [value, setValue] = useState(partySizeValue);
    const partSizeStyles = { 'minWidth': 100, 'maxWidth': 200 };
    
    const handleMinus = (event) => {
      event.stopPropagation()
      if(value > 1) {
        setValue(parseInt(value, 10) - 1);
        dispatch(setPartySize(parseInt(value, 10) - 1))
      }
    };
    
    const handlePlus = (event) => {
        event.stopPropagation()
      if(isNaN(value) || value === '') {
        setValue(1)
        dispatch(setPartySize(1))
      } else {
        setValue(parseInt(value, 10) + 1);
        dispatch(setPartySize(parseInt(value, 10) + 1))
      }
    };
    
 
    return (
        <Stack spacing={6} className='flex self-center' style={partSizeStyles}>
          <InputGroup title='How many people?'>
            <InputGroup.Button onClick={handleMinus}>-</InputGroup.Button>
            <InputNumber 
                        className={'custom-input-number'} 
                        value={partySizeValue} 
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