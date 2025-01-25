import { Text, View,TouchableOpacity } from 'react-native'
import { useState } from 'react';
import React from 'react'

interface DetailsInterface {
    description: string;
}

const DescriptionSection = ({description}:DetailsInterface) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View>
        <Text
            className="text-[#242424] text-lg font-[sora-Semi] ml-1 "
            >Description
        </Text>

        <View 
            className='p-2'
        >
            <Text numberOfLines={expanded ? undefined : 3}
            className='text-[#A2A2A2] text-xs font-[sora-regular]'
            >
                {expanded ? description : `${description.slice(0, 100)}...`}
            </Text>
            <TouchableOpacity onPress={() => setExpanded(!expanded)}>
                <Text 
                    className='text-[#C67C4E] text-xs font-[sora-regular] mt-1'
                >
                    {expanded ? 'Read Less' : 'Read More'}
                </Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default DescriptionSection