import {
  TextInput,
  TextInputProps,
  ActionIcon,
  useMantineTheme,
} from '@mantine/core';
import { IconSearch, IconArrowRight, IconArrowLeft } from '@tabler/icons';

function SearchBar(props: TextInputProps) {
  const theme = useMantineTheme();

  return (
    <TextInput
      icon={<IconSearch size={18} stroke={1.5} />}
      size="md"
      // rightSection={
      //   <ActionIcon
      //     size={32}
      //     radius="xl"
      //     color={theme.primaryColor}
      //     variant="filled"
      //   >
      //     {theme.dir === 'ltr' ? (
      //       <IconArrowRight size={18} stroke={1.5} />
      //     ) : (
      //       <IconArrowLeft size={18} stroke={1.5} />
      //     )}
      //   </ActionIcon>
      // }
      placeholder="Staff Name or Job Title"
      rightSectionWidth={42}
      {...props}
    />
  );
}

export default SearchBar;
