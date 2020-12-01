package com.mecanica.org.domain;

public class PagosCalculos {

    public Double totalApagar;
    public Double faltanteApagar;

    public PagosCalculos() {
    }

    public PagosCalculos(Double totalApagar, Double faltanteApagar) {
        this.totalApagar = totalApagar;
        this.faltanteApagar = faltanteApagar;
    }

    public Double getTotalApagar() {
        return totalApagar;
    }

    public void setTotalApagar(Double totalApagar) {
        this.totalApagar = totalApagar;
    }

    public Double getFaltanteApagar() {
        return faltanteApagar;
    }

    public void setFaltanteApagar(Double faltanteApagar) {
        this.faltanteApagar = faltanteApagar;
    }
}
