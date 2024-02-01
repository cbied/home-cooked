import { MultiCascader, Button, Stack } from 'rsuite';
import mockFoodData from '../../mockData/mockFoodTypes.json';

const styles = { width: 250, display: 'block' };

const FoodTypes = () => {

    return (
        <Stack spacing={6}>
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