import { Fragment } from "react";
import { MultiCascader, Button } from 'rsuite';
import mockFoodData from '../../mockData/mockFoodTypes.json';

const styles = { width: 250, display: 'block' };

const FoodTypes = () => {

    return (
        <Fragment> 
            <MultiCascader 
            toggleAs={Button} 
            size="lg" 
            placeholder="Type of Food" 
            data={mockFoodData} 
            style={styles} />
        </Fragment>
    )
}

export default FoodTypes;