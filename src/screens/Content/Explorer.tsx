import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  View,
  TouchableOpacity
} from 'react-native';

import { useRoute } from '@react-navigation/native';
import { Status } from '../../components/UI/StatusBar';
import { RootRouteProps, SearchFormInput } from '../../services/types';
import { colors } from '../../themes';
import { Close, ArrowRight, Search } from '../../sources';
import { paragraph } from '../../constants/alunnaStyle';
import { Users } from '../../hooks/search/Users';
import { Posts } from '../../hooks/search/Posts';
import { string, object } from 'zod';
import { useZodForm } from '../../hooks/context';
import { SubmitHandler } from 'react-hook-form';

const SearchFormSchema = object({
  value: string().min(3).max(248),
})

const Explorer: React.FC = () => {

  const route = useRoute<RootRouteProps<'Explorer'>>();
  const earlyValue = route.params.value.replace(/\s+/g, ' ').trim() || '';

  const [searchValue, setSearchValue] = React.useState<string>(earlyValue);

  const form = useZodForm({
    schema: SearchFormSchema
  })

  React.useEffect(() => {
    if (route.params.value.length < 3) return;

    form.reset({
      value: route.params.value
    })
  }, [route.params.value])

  const onSubmit: SubmitHandler<SearchFormInput> = ({ value }) => {
    if (value && value.length > 3) setSearchValue(value.replace(/\s+/g, ' ').trim());
  }

  return (
    <>
      <Status />

      <KeyboardAvoidingView
        behavior={Platform.select({ ios: 'padding' })}
        style={{ flex: 1, backgroundColor: colors.alpha }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <View style={{
              borderBottomWidth: 0.7,
              borderBottomColor: colors.echo,
              paddingHorizontal: 24,
              paddingVertical: 6,
              marginBottom: 12,
              flexDirection: 'row'
            }}>
              <View style={{ justifyContent: 'center' }}>
                <Search />
              </View>

              <TextInput
                {...form.register('value')}
                style={{
                  ...paragraph,
                  flex: 1,
                  textAlignVertical: 'center',
                  paddingHorizontal: 10,
                  paddingVertical: 8
                }}
                autoCorrect={false}
                placeholder='Search'
                returnKeyType='search'
                onSubmitEditing={form.handleSubmit(onSubmit)}
                placeholderTextColor={colors.betaThick}
                selectionColor={colors.red}
                onChangeText={(text) => form.setValue('value', text)}
                autoFocus={route.params.value ? false : true}
                defaultValue={form.getValues()?.value}
              />

              <TouchableOpacity
                style={{ justifyContent: 'center', paddingHorizontal: 12 }}
                onPress={() => form.reset({ value: '' })}
              >
                <Close color={colors.teal} />
              </TouchableOpacity>

              <TouchableOpacity
                style={{ justifyContent: 'center' }}
                onPress={form.handleSubmit(onSubmit)}
              >
                <ArrowRight color={colors.purple} />
              </TouchableOpacity>
            </View>

            <Users value={searchValue} />
            <Posts value={searchValue} />
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  )
}

export { Explorer }