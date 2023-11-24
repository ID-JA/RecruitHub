import { useQuery } from "@tanstack/react-query";

export const useGetHelloWorld = () => {
  const query = useQuery({
    queryKey: ["hello-world"],
    queryFn: () => {
      function simulatePromise(condition: boolean): Promise<string> {
        return new Promise((resolve, reject) => {
          if (condition) {
            resolve('Promise resolved');
          } else {
            reject(new Error('Promise rejected'));
          }
        });
      }
      return simulatePromise(true);
    },
  });

  return query;
};
