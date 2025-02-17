---
title: How to calculate Euler's Finance health score
published: 2025-02-17 
description: Liquidation is Brutal. Know Your Euler Health Factor or Sink!
image: "./high_lvl.png"
category: DeFi
tags: ["Probability", "Mathematics", "Quant"]
slug: health-factor
---

===

## Health score

To avoid to be liquidated, keep $HealthScore$ greater than 1.0 .

Generally $HealthScore$ is denoted as 
$$
HealthScore = {RiskAdjustedCollateral \over RiskAdjustedLiability}
$$

### Evaluate risk-adjusted collateral
    
Here assume a user deposit a single asset and leverage its position.

Let $a^c$ denote the balance of collateral and $s^c$ denote the self-collateralized balance of collateral.
Let $f^c$ denote the collateral factor of a asset, $f^b$ denote its borrow factor and $f^s$ denote the collateral factor of a self-collateralized asset (called self-collateralized factor).

Risk-adjusted collateral is calculated as 
$$
v^c = f^c[a^c -{s^c \over f^s}] + s^c \tag{1}
$$
where $f^c \leqq f^s$.

### References
https://github.com/euler-xyz/euler-contracts/blob/6086c6e585f03ceb3365a4e011dc892af96f1de8/contracts/modules/RiskManager.sol#L317-L329


### Evaluate risk-adjusted liability


Risk-adjusted liability is calculated as
$$
v^b =  {a^b - s^b \over f^b} + s^b \tag{2}
$$

where self-collateralized part of any asset have always 1.0 borrow factor. $s^b$ is always equal to $s^c$ ??

> In Euler self-collateralized part of any asset has always 0.95 collateral factor and 1.0 borrow factor.

for example, 
```
deposits 1000 USDC and mints 9000 USDC. normal CF of USDC is 0.9

now collateral 10000 USDC and liability 9000 USDC.

so, risk adjusted collateral = (10000 - 9000/0.95) * 0.9 + 9000 * 0.95 = 9023
risk adjusted liability  = 9000*1
```

### References

https://github.com/euler-xyz/euler-contracts/blob/6086c6e585f03ceb3365a4e011dc892af96f1de8/contracts/modules/RiskManager.sol#L331-L334
