import type { ReactNode } from 'react';

import styles from '~/styles/components/page-container.module.css';

interface PageContainerProps {
  children?: ReactNode;
}

const PageContainer = (props: PageContainerProps) => {
  return <article className={styles.container}>{props.children}</article>;
};

export default PageContainer;
