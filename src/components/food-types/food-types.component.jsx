import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFoodTypes } from '../../store/experience-finder-slice/experience-finder-slice';
import { MultiCascader, Button, Stack } from 'rsuite';
import mockFoodData from '../../mockData/mockFoodTypes.json';


const FoodTypes = ({ isInline, largeStyles, smallStyles }) => {
    const foodTypeValues = useSelector(state => state.experienceFinder.foodTypes)
    const [ foodTypesArr, setFoodTypesArr ] = useState(foodTypeValues)
    const dispatch = useDispatch()

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
                itemChildrenArr = foodTypesArr.filter((item) => {
                    if(!removeChildrenArr.includes(item)) {
                        return item !== itemDataType.value
                    }
                })
            }
            setFoodTypesArr(itemChildrenArr)
            dispatch(setFoodTypes(itemChildrenArr))
        } else {
            const values = foodTypesValue.filter(value => {
                if(typeof(value) !== 'number') {
                    return value
                }
            })
            setFoodTypesArr(values)
            dispatch(setFoodTypes(values))
        }
    }

    useEffect(() => {
        setFoodTypesArr(foodTypeValues)
    }, [dispatch, foodTypeValues])


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