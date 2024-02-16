import { MultiCascader, Button, Stack } from 'rsuite';
import mockFoodData from '../../mockData/mockFoodTypes.json';

const styles = { 'min-width': 200 };

const FoodTypes = () => {

    return (
        <Stack spacing={6} className='rounded-full'>
            <MultiCascader 
            toggleAs={Button} 
            size="lg" 
            placeholder="Type of Food" 
            data={mockFoodData} 
            style={styles} />
        </Stack>
    )
}

export default FoodTypes;