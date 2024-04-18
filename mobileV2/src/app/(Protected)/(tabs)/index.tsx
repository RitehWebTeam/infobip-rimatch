import React, { useEffect, useMemo, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useQueryClient } from "@tanstack/react-query";
/* import { CircularProgress } from "@mui/material"; */
import MatchCard from "../../../components/MatchCard";
import { UsersService } from "../../../api/users";
import ProfileCard from "../../../components/ProfileCard";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  return <AuthLayout />;
}

const PAGE_SIZE = 5;

export const AuthLayout = () => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const result = UsersService.useGetPotentailUsers(page);
  const acceptMatch = UsersService.useAcceptMatch();
  const rejectMatch = UsersService.useRejectMatch();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const prefetchPotential = UsersService.usePrefetchPotentialUsers(page);
  const queryClient = useQueryClient();

  const handleNextUser = (matchAccept: boolean, userId: string) => {
    setLoading(true);
    const match = matchAccept ? acceptMatch.mutate : rejectMatch.mutate;
    if (currentUserIndex === PAGE_SIZE - 3) {
      prefetchPotential();
    }
    match(
      { userId },
      {
        onSettled: () => {
          if (currentUserIndex === PAGE_SIZE - 1) {
            setPage((prev) => prev + 1);
            setCurrentUserIndex(0);
          } else {
            setCurrentUserIndex((prev) => prev + 1);
          }
          setLoading(false);
        },
      }
    );
  };

  useEffect(() => {
    return () => {
      queryClient.invalidateQueries({
        queryKey: ["UsersService.getPotentialUsers"],
      });
    };
  }, [queryClient]);

  const user = useMemo(() => {
    if (!result.data) return undefined;
    if (result.data.length <= currentUserIndex) return undefined;
    return result.data[currentUserIndex];
  }, [currentUserIndex, result.data]);

  if (result.isLoading || result.isFetching) {
    return (
      <PotentialUsersContainer>
        <View style={styles.loadingContainer}>
          <Text>Loading</Text>
        </View>
      </PotentialUsersContainer>
    );
  }

  if (result.isError || !result.isSuccess) {
    console.log(result.error)
    return (
      <PotentialUsersContainer>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Whoops.</Text>
          <Text style={styles.errorText}>
            Something went wrong, try refreshing the page
          </Text>
        </View>
      </PotentialUsersContainer>
    );
  }

  if (result.data.length === 0 || !user) {
    return (
      <PotentialUsersContainer>
        <Text style={styles.noUsersText}>
          No more users? Impossible! Maybe they're just hiding...
        </Text>
      </PotentialUsersContainer>
    );
  }

  const openProfile = () => {
    setIsProfileOpen(true);
  };

  const closeProfile = () => {
    setIsProfileOpen(false);
  };

  return (
    <>
      {!isProfileOpen && (
        <PotentialUsersContainer>
          <MatchCard
            user={user}
            handleNextUser={handleNextUser}
            openDetailedProfile={openProfile}
            loading={loading}
          />
           
          </PotentialUsersContainer>
      )}
      {isProfileOpen && (
          <GestureHandlerRootView> 
           <ProfileCard user={user} onClose={closeProfile} handleNextUser={function (matchAccept: boolean, userId: string): void {
            throw new Error("Function not implemented.");
          } } /> 
        </ GestureHandlerRootView>
      )}
    </>
  );
};

const PotentialUsersContainer = ({ children }: { children?: React.ReactNode }) => {
  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    flexGrow: 1,
    paddingBottom: 12,
    minHeight: undefined,
    maxHeight: 800,
    maxWidth: '100%',
    marginHorizontal: 'auto',
  },
  cardContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    padding: 16,
    width: '100%',
    maxWidth: 400,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 16,
  },
  errorText: {
    color: '#ff0000',
    marginBottom: 16,
    textAlign: 'center',
  },
  noUsersText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 20,
    color: '#000000',
  },
  profileContainer: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
});
