import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment, incrementByAmount } from '../redux/counter/counterSlice'
import { Button, Card, CardBody, CardHeader, Slider } from '@nextui-org/react'
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import confetti from 'canvas-confetti';
import { useState } from 'react';

export default function Counter() {
  const count = useSelector((state) => state.counter.value)
  const [incremenAmount, setIncrementAmount] = useState();
  const dispatch = useDispatch()

  const handleConfetti = () => {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.5, x: 0.55 },
        zIndex: 1000,
      });
  };

  return (
    <div className='flex items-center justify-center h-screen bg-background-gray'>
        <Card className="w-96 shadow-lg">
            <CardHeader className='flex justify-center'>
                <h2 className='text-2xl font-bold text-primary'>Counter App</h2>
            </CardHeader>

            <CardBody className='flex flex-col items-center space-y-6'>
                <h3 className='text-4xl font-bold text-primary-dark'>{count}</h3>
                <div className='flex space-x-4'>
                    <Button color='danger' variant='shadow' startContent={<MinusIcon className='h-6 w-6'/>} onPress={() => {
                        handleConfetti();
                        dispatch(decrement());
                    }}>
                        Decrease
                    </Button>
                    <Button color='success' variant='shadow' startContent={<PlusIcon className='h-6 w-6'/>} onPress={() => {
                        handleConfetti();
                        dispatch(increment());
                    }}>
                        Increase
                    </Button>
                </div>
                <div className='w-full space-y-2'>
                    <Slider size='sm' step={1} color='primary' label="Increment Amount" showSteps={true} maxValue={10} minValue={1} className='max-w-md' onChange={setIncrementAmount}/>
                    <div className='flex justify-between'>
                        <span className='text-sm text-primary-dark'>
                            Amount: {incremenAmount}
                        </span>
                        <Button color='primary' variant='shadow' onPress={() => { 
                            handleConfetti();
                            dispatch(incrementByAmount(Number(incremenAmount)));
                         }}
                         size='sm'
                         >
                            Add Amount
                        </Button>
                    </div>
                </div>
            </CardBody>
        </Card>
    </div>
  )
}