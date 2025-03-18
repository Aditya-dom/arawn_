---
title: Multi-asset YieldSpace
published: 2025-03-17
description: This post introduces a fresh take on decentralized finance by explaining a multi-asset YieldSpace model that bridges two familiar liquidity approaches. It shows how a single parameter can smoothly shift between a constant reserve system and a constant product system (like Balancer's), determining prices and interest rates along the way—all backed by clear, human-friendly math.
image: "./cov.png"
category: DeFi
tags: ["Probability", "Mathematics", "Quant", YieldSpace]
slug: YieldSpace
---

[ToC]

## Definition
underlying: base asset of a interest-bearing token
interest-bearing token: IOU like cDAI, eUSDC
$x$: Underlying reserve in Pool
$y$: Zero-coupon bond reserve in Pool

## Previous Work
Constant reserve: $V_{rsv}(x, y) = x + y$ , the sum value function.
Constant product: $V_{prod}(x, y) = \sqrt{xy}$, the product value function.

# 2-asset
before and after the swap, the following is invariant.
$$
x^{1-t}+y^{1-t} = k \tag{1}
$$

## Marginal price and Impliedt rate (IR)
In general, IR can be expressed: 
$$
r = (1/p)^{1/t} -1
$$
$r$: IR
$p$: Bond price in underlying.

$$
p = \left(\frac{x}{y}\right)^t
$$

$$
r = y/x -1
$$

## Value Function
$$
V(x,y,t) = (x^{1-t}+y^{1-t})^{1/(1-t)} \tag{2}
$$

### Lemma
$If \;\; t \to 0,\; then\;\; V(x,y,1) \to V_{rsv}$: mStable
$If \;\; t \to 1,\; then\;\; V(x,y,1) \to V_{prod}$: Balancer 2-asset


# 3-asset
$$
x^{1-t}+y^{1-t} + z^{1-t} = k \tag{3}
$$

$$
V(x,y,z,t) = (x^{1-t}+y^{1-t}+z^{1-t})^{1/(1-t)} \tag{4}
$$

$If \;\; t \to 0,\; then\;\; V(x,y,1) \to x+y+z$になるはず。
$If \;\; t \to 1,\; then\;\; V(x,y,z,1) \to (xyz)^{1/3}$ 3-asset BalancerのValue Funcになるはず。

$Proof.$
$$
\lim_{t \to 1}{(x^{1-t}+y^{1-t}+z^{1-t})^{1/(1-t)}}\\
 = \exp{\ln \; \lim_{t\to 1}{(x^{1-t}+y^{1-t}+z^{1-t})^{1/(1-t)}}} \\
 =\exp{\lim_{t\to 1}{ \ln(x^{1-t}+y^{1-t}+z^{1-t})\over {1-t}}} \\
$$
Here, we can apply L'Hopital's rule. so, 
$$
\lim_{t\to 1}{ \ln(x^{1-t}+y^{1-t}+z^{1-t})\over {1-t}}\\
= \lim_{t\to 1}{
    \frac{
        \frac{\partial \ln(x^{1-t}+y^{1-t}+z^{1-t})}{\partial t}
    }{
        \frac{\partial (1-t)}{\partial t}
    }
  }\\
 = \frac{\frac{-\ln(xyz)}{3}}{-1}\\
 = {\ln(xyz) \over 3}
$$
as a reference, 
![](https://i.imgur.com/VOXlmO7.png)

Therefore,
$$
\lim_{t\to 1 }V(x,y,z,t) = \exp{\ln(xyz) \over 3} = (xyz)^{1/3}
$$
This is exactly same Value Function of Balancer 3-asset with all weights 1/3.

# n-asset
Let $B_i$ denote balance of asset $i$ in a pool and $\mathbf{B}$ be vector of balances $[B_1, B_2...B_n]$.

Trading Function $f$:
$$
    f(\mathbf{B}) = \sum{B_i^{1-t}}  \tag{5}
$$

Value Function $V$:
$$
V(\mathbf{B},t) =(\sum{B_i^{1-t}} )^{1/(1-t)} \tag{6}
$$

Marginal Price $p_i$:
$$
p_i = \left({B_i \over B_o}\right)^t \tag{7}
$$

### Proof
Let $B_o$ denote balance of token $o$ bought by a trader and $B_i$ denote balance of token $o$ sold by the trader.

By denition, $p_i$ is minus the partial derivative of $B_i$ in function of $B_o$:
$$
p_i = - \frac{\partial B_i}{\partial B_o} \tag{8}
$$

From the value function denition we can isolate $B_i$:
$$
    B_i = \left \{ V^{1-t} - \sum_{k\ne i}B_k^{1-t} - B_o^{1-t} \right\}^{1/(1-t)} \tag{9}
$$

Now Eq8 becomes:
$$
p_i = - \frac{\partial B_i}{\partial B_o} \\
    = - \frac{\partial}{\partial B_o} \left \{ V^{1-t} - \sum_{k\ne i}B_k^{1-t} - B_o^{1-t} \right\}^{1/(1-t)} \\
    = \left (V^{1-t} - \sum_{k\ne i}B_k^{1-t} - B_o^{1-t} \right)^{1/(1-t)-1} B_o^{-t} \\
    = (B_i^{1-t})^{1/(1-t)-1} B_o^{-t} \\
    = \left({B_i \over B_o}\right)^t \\
$$


# References
[Constant Power Root Market Makers](https://arxiv.org/pdf/2205.07452v1.pdf)

[Balancer Whitepaper](https://balancer.fi/whitepaper.pdf)

<script src="https://giscus.app/client.js"
        data-repo="Aditya-dom/arawn.github.io"
        data-repo-id="R_kgDOLeAbmQ"
        data-category="General"
        data-category-id="DIC_kwDOLeAbmc4CeCQd"
        data-mapping="title"
        data-strict="0"
        data-reactions-enabled="1"
        data-emit-metadata="1"
        data-input-position="top"
        data-theme="dark_dimmed"
        data-lang="en"
        data-loading="lazy"
        crossorigin="anonymous"
        async>
</script>
