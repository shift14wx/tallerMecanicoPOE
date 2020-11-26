package com.mecanica.org.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Entrada.
 */
@Entity
@Table(name = "entrada")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Entrada implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "descripcion")
    private String descripcion;

    @Column(name = "activa")
    private Boolean activa;

    @Column(name = "precio")
    private Double precio;

    @ManyToOne
    @JsonIgnoreProperties(value = "entradas", allowSetters = true)
    private Servicio servicio;

    @ManyToOne
    @JsonIgnoreProperties(value = "entradas", allowSetters = true)
    private Averia averia;

    @ManyToOne
    @JsonIgnoreProperties(value = "entradas", allowSetters = true)
    private Empleado empleado;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public Entrada descripcion(String descripcion) {
        this.descripcion = descripcion;
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Boolean isActiva() {
        return activa;
    }

    public Entrada activa(Boolean activa) {
        this.activa = activa;
        return this;
    }

    public void setActiva(Boolean activa) {
        this.activa = activa;
    }

    public Double getPrecio() {
        return precio;
    }

    public Entrada precio(Double precio) {
        this.precio = precio;
        return this;
    }

    public void setPrecio(Double precio) {
        this.precio = precio;
    }

    public Servicio getServicio() {
        return servicio;
    }

    public Entrada servicio(Servicio servicio) {
        this.servicio = servicio;
        return this;
    }

    public void setServicio(Servicio servicio) {
        this.servicio = servicio;
    }

    public Averia getAveria() {
        return averia;
    }

    public Entrada averia(Averia averia) {
        this.averia = averia;
        return this;
    }

    public void setAveria(Averia averia) {
        this.averia = averia;
    }

    public Empleado getEmpleado() {
        return empleado;
    }

    public Entrada empleado(Empleado empleado) {
        this.empleado = empleado;
        return this;
    }

    public void setEmpleado(Empleado empleado) {
        this.empleado = empleado;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Entrada)) {
            return false;
        }
        return id != null && id.equals(((Entrada) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Entrada{" +
            "id=" + getId() +
            ", descripcion='" + getDescripcion() + "'" +
            ", activa='" + isActiva() + "'" +
            ", precio=" + getPrecio() +
            "}";
    }
}
