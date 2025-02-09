import { FlatList, FlatListProps, View } from 'react-native';

import { getStyle } from '../utils/styles';

const ItemSeparatorComponent: React.FC<{}> = (props: {}) => {
    return (
        <View style={{alignItems: 'center'}}>
            <View style={{backgroundColor: getStyle().backgroundDark, height: 1, width: '95%'}} />
        </View>
    );
}

const List: React.FC<FlatListProps<any>> = (props: FlatListProps<any>) => {
    return (
        <FlatList
            {...props}
            ListHeaderComponent={
                <>
                    {props.ListHeaderComponent}
                    {props.ListHeaderComponent !== undefined && <ItemSeparatorComponent />}
                </>
            }
            ItemSeparatorComponent={ItemSeparatorComponent}
            ListFooterComponent={
                <>
                  {props.data!.length > 0 && props.ListFooterComponent !== undefined && <ItemSeparatorComponent />}
                  {props.ListFooterComponent}
                </>
              }
        />
    )
}

export default List;