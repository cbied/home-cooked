import { MultiCascader, Button, Stack } from 'rsuite';
import mockFoodData from '../../mockData/mockFoodTypes.json';



const FoodTypes = ({ isInline, largeStyles, smallStyles }) => {

    return (
        <Stack className='rounded-full'>
            <Stack.Item>
                <MultiCascader 
                toggleAs={Button} 
                size="lg" 
                placeholder="Type of Food" 
                data={mockFoodData} 
                style={largeStyles === undefined ? smallStyles : largeStyles}
                inline={isInline}
                className='w-fit' />
            </Stack.Item>
        </Stack>
    )
}

export default FoodTypes;