---
title: Shrinkage Estimators:- How Shrinkage Estimators Enhance Predictive Accuracy?
published: 2024-10-01 
description: Shrinkage estimators improve accuracy by pulling extreme estimates closer to the average, especially when data is noisy or limited. This helps make predictions more stable and prevents overfitting.
image: "./cover_shrink.webp"
category: Programming
tags: ["Programming", "Quant" , "Optimalportfolio"]
slug: shrinkestimator
---
In this article series on how to optimize portfolios, we have looked at the [existence of market invariants](https://arawn.live/posts/Marketprinciple/), estimating distribution of returns using [nonparametric](https://arawn.live/posts/EDN/). Now we discuss a method of estimating the probability distribution using shrinkage estimators. For those interested in optimizing portfolios, look at [Quant_OptimalPortfolio](https://github.com/Aditya-dom/Quant_OptimalPortfolio).

I must agree, the name shrinkage is quite a strange one, but in essence what shrinkage estimators do is that they ‘shrink’ the estimate with high bias to an estimate with high variance. In other words, it is the sum of an estimator with high variance and an estimator with high bias, with some weighting between the two. Although it sounds easy, the difficulty comes in deciding which estimators to use and how to optimal weigh the estimators.

## Bias vs Variance
First, we shall begin by understanding the trade-off between bias and variance. This trade-off in statistical estimation is very similar to the bias-variance trade-off encountered in machine learning. Some estimators have more bias than others and some have more variance than others. A way to illustrate this is the following. Consider the sample covariance of a set of observations. The sample covariance is an unbiased estimator of the population covariance, with the following form:

$$
\hat{\Sigma}_s = \frac{1}{n-1} \left[ (x - \hat{\mu})(x - \hat{\mu})^T \right]
$$

However, this estimator only works well when the amount of data is large. So when the dataset is small, the variance of the estimator is large. Now consider another estimator with lower variance and error, for example, the Maximum Likelihood Estimator. The form of MLE estimator for a normal distribution assumption will be


$$
\hat{\Sigma}_s = \frac{1}{n-1} \left[ (x - \hat{\mu})(x - \hat{\mu})^T \right]
$$

Obviously, since the distribution is a simple Gaussian, the difference between the two estimates is not significant. Nevertheless, it allows us to prove the usefulness of shrinkage estimators. MLE estimators usually have lesser error and hence less variance. They tend to work better even when the data set is not very large.

## Shrinkage Estimator
Now we can begin unraveling the shrinkage estimator. Consider the following estimator:

$$
\hat{\Sigma}{shrunk} = \delta \hat{\Sigma}_s + (1 - \delta) \hat{\Sigma}{MLE}
$$

Where delta is called the shrinkage coefficient. The idea of a shrinkage estimator is simple. However, think about how to choose the optimal value of delta? The solution to this problem was found by Ledoit and Wolf in this excellent [paper](https://perso.ens-lyon.fr/patrick.flandrin/LedoitWolf_JMA2004.pdf).

The estimators that are shrunk in the example used by Ledoit is sample covariance and the identity matrix. It might seem strange to use the identity matrix as part of the shrinkage, but it is more of decreasing the error of the sample covariance. I will state the optimal value of shrinkage without proof as the proof has a bit of linear algebra that can be done by the reader.

$$
\hat{\Sigma} = \frac{\mathbb{E}[|S - \Sigma|^2]}{\mathbb{E}[|S - \mu I|^2]} \text{tr}(\Sigma)I + \frac{\mathbb{E}[|S - \mu I|^2]}{|S - \mu I|^2} S
$$

The issue is that the actual theoretical optimal shrinkage requires the knowledge of the actual covariance matrix. However, there are several implementations that find approximations to this shrinkage matrix and work very well.