import { useState, forwardRef } from 'react';
import { ButtonToolbar, InputNumber, InputGroup, Popover, Whisper, Button } from 'rsuite';

const PartySizeInput = () => {

    const [value, setValue] = useState(0);
    const handleMinus = (event) => {
        
      setValue(parseInt(value, 10) - 1);
    };
    const handlePlus = (event) => {
        console.log(event)
        event.stopPropagation()
console.log(document.getElementById('dropdown'))

      setValue(parseInt(value, 10) + 1);
    };
    
    const DefaultPopover = forwardRef(({ content, ...props }, ref) => {
        console.log(content)
        return (
          <Popover ref={ref} title="How many people?" {...props}>
          Adults: 
          <InputGroup noCaret={true}>
              <InputGroup.Button onClick={handleMinus}>-</InputGroup.Button>
              <InputNumber className={'custom-input-number'} value={value} onChange={setValue}  />
              <InputGroup.Button onClick={handlePlus}>+</InputGroup.Button>
          </InputGroup>
          </Popover>
        );
      });

    const CustomPopdown = ({ placement, loading, children }) => (
        <Whisper
            enterable={true}
          trigger="click"
          placement={placement}
          controlId={`control-id-${placement}`}
          speaker={<DefaultPopover content={placement} />}>
          <Button appearance="subtle">{children || placement}</Button>
        </Whisper>
      );
  

    return (
        <ButtonToolbar>
        <CustomPopdown placement="bottomEnd" />
      </ButtonToolbar>
    )
}

export default PartySizeInput;