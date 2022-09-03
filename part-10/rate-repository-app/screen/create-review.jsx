import * as yup from "yup";

import ReviewForm from "../components/organisms/review-form";
import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";
import { useNavigate, useParams } from "react-router-native";

const CreateReview = () => {
  const [mutate] = useMutation(CREATE_REVIEW);
  const { id } = useParams();
  const navigate = useNavigate();
  const onSubmit = async (
    { repoOwnerName, repoName, rating, review },
    { resetForm }
  ) => {
    try {
      const { data } = await mutate({
        variables: {
          review: {
            ownerName: repoOwnerName,
            repositoryName: repoName,
            rating: Number(rating),
            text: review,
          },
        },
      });

      if (data) {
        navigate(`/repo/${id}`);
      }
    } catch (e) {
      console.log(e);
    }
    resetForm({ repoOwnerName: "", repoName: "", rating: "", review: "" });
  };

  const validateSchema = yup.object().shape({
    repoOwnerName: yup.string().required("Repository owner name is required"),
    repoName: yup.string().required("Repository name is required"),
    rating: yup
      .number()
      .min(0, "rating is too low")
      .max(100, "highest review is 100")
      .required("Rating is required"),
    review: yup.string().max(80, "review is too long"),
  });

  return (
    <ReviewForm
      initialValues={{
        repoOwnerName: "",
        repoName: "",
        rating: "",
        review: "",
      }}
      validateSchema={validateSchema}
      onSubmit={onSubmit}
    />
  );
};

export default CreateReview;
