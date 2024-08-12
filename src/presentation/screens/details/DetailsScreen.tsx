import { StackScreenProps } from "@react-navigation/stack";
import { Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { MovieDetails } from "../../components/movie/MovieDetails";
import { MovieHeader } from "../../components/movie/MovieHeader";
import { useMovie } from "../../hooks/useMovie";
import { RootStackParams } from "../../navigation/Navigation";
import { FullScreenLoader } from "../../components/loaders/FullScreenLoader";

interface Props extends StackScreenProps<RootStackParams, 'Details'> { };

export const DetailsScreen = ({ route }: Props) => {

  const { movieId } = route.params;
  const { isLoading, movie, cast=[] } = useMovie(movieId);

  if (isLoading) {
    return (<FullScreenLoader />)
  }

  return (
    <ScrollView>
      <MovieHeader
        originalTitle={movie!.originalTitle}
        title={movie!.title}
        poster={movie!.poster}
      />

      <MovieDetails movie={movie!} cast={cast}/>
    </ScrollView>)
}
