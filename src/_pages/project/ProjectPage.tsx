import React, { useEffect } from 'react';
import ProjectTaskBoard from './_components/ProjectTaskBoard';
import useProjectQuery from './_apis/_queries/useProjectQuery';
import useGoogleApiStore from '../../common/_stores/useGoogleApiStore';
import { useShallow } from 'zustand/shallow';
import useProjectStore from './_stores/useProjectStore';
import useLoader from '../../common/_stores/useLoader';


const ProjectPage: React.FC = () => {

  const { authStatus } = useGoogleApiStore(
    useShallow((state) => ({
      authStatus: state.authStatus,
    }))
  );

  const { data, isFetched, isFetching } = useProjectQuery(authStatus ? { ignoreHide: true } : undefined);

  useEffect(() => {
    if (data && isFetched && !isFetching) {
      useProjectStore.setState({
        projectList: data,
      });
    }
  }, [data, isFetched, isFetching]);

  useEffect(() => {
    useLoader.setState({ isLoading: isFetching });
  }, [isFetching]);

  return (
    <ProjectTaskBoard />
  );
};

export default ProjectPage;
