import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFoodTypes } from '../../store/experience-finder-slice/experience-finder-slice';
import { MultiCascader, Button, Stack } from 'rsuite';
import mockFoodData from '../../mockData/mockFoodTypes.json';


const FoodTypes = ({ isInline }) => {
    const foodTypeValues = useSelector(state => state.experienceFinder.foodTypes)
    const [ foodTypesArr, setFoodTypesArr ] = useState(foodTypeValues)
    const dispatch = useDispatch()
    const largeStyles = { 'minWidth': 200, 'maxWidth': 230 };

    const handleFoodTypeChange= (foodTypesValue, itemDataType) => {
        if((itemDataType && typeof(itemDataType.value) === 'number')) {
            let itemChildrenArr = []
            if(!foodTypesArr.includes(itemDataType.children[0].value)) {
                for(let i = 0; i < itemDataType.children.length; i++) {
                    itemChildrenArr.push(itemDataType.children[i].value)
                }
                itemChildrenArr.push(...foodTypesArr)
            } else {
                let removeChildrenArr = []
                for(let i = 0; i < itemDataType.children.length; i++) {
                    removeChildrenArr.push(itemDataType.children[i].value)
                }
                itemChildrenArr = foodTypesArr.filter(item => !removeChildrenArr.includes(item))      
            }
            setFoodTypesArr(itemChildrenArr)
            dispatch(setFoodTypes(itemChildrenArr))
        } else {
            const values = foodTypesValue.filter(value => typeof(value) !== 'number')
            setFoodTypesArr(values)
            dispatch(setFoodTypes(values))
        }
    }

    return (
        <Stack className='rounded-full'>
            <Stack.Item>
                <MultiCascader 
                toggleAs={Button} 
                size="lg" 
                placeholder="Type of Food" 
                data={mockFoodData} 
                style={largeStyles}
                inline={isInline}
                className='w-fit'
                onCheck={(foodTypeItem, itemDataType) => handleFoodTypeChange(foodTypeItem, itemDataType)}
                onClean={() => handleFoodTypeChange([])}
                value={foodTypeValues}
                countable={false} />
            </Stack.Item>
        </Stack>
    )
}

export default FoodTypes;